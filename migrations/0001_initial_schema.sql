-- ========================================
-- XIVIX 데이터베이스 스키마
-- ========================================

-- 1. 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  profile_image TEXT,
  
  -- 소셜 로그인 정보
  provider TEXT, -- 'kakao', 'naver', 'email'
  provider_id TEXT,
  
  -- 추천 시스템
  referral_code TEXT UNIQUE, -- 내 추천코드 (자동생성)
  referred_by TEXT, -- 누구의 추천으로 가입했는지 (referral_code)
  referral_count INTEGER DEFAULT 0, -- 추천한 사람 수
  vip_status INTEGER DEFAULT 0, -- 0: 일반, 1: VIP (3명 이상 추천)
  
  -- 상태
  role TEXT DEFAULT 'customer', -- 'customer', 'admin'
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'suspended'
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 결제 테이블
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  
  -- 주문 정보
  order_id TEXT UNIQUE NOT NULL,
  order_name TEXT NOT NULL,
  items TEXT, -- JSON: [{type, id, name, price}]
  
  -- 금액
  original_amount INTEGER NOT NULL, -- 원래 금액
  discount_amount INTEGER DEFAULT 0, -- 할인 금액
  coupon_id INTEGER, -- 사용한 쿠폰
  total_amount INTEGER NOT NULL, -- 최종 결제 금액
  
  -- 고객 정보 (비회원 결제용)
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  
  -- 결제 상태
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'cancelled', 'refunded'
  payment_method TEXT, -- 'CARD', 'TRANSFER' 등
  pg_response TEXT, -- PG사 응답 JSON
  
  -- 구독/반복 결제
  is_subscription INTEGER DEFAULT 0,
  subscription_cycle TEXT, -- 'monthly', 'yearly'
  next_payment_date DATE, -- 다음 결제일
  
  -- 알림 발송 기록
  notified_d5 INTEGER DEFAULT 0, -- D-5 알림 발송 여부
  notified_d1 INTEGER DEFAULT 0, -- D-1 알림 발송 여부
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);

-- 3. 질문지 응답 테이블
CREATE TABLE IF NOT EXISTS questionnaires (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  payment_id INTEGER,
  
  -- 질문 응답
  industry TEXT, -- 업종
  sns_status TEXT, -- SNS 운영 상황
  goal TEXT, -- 목표
  additional TEXT, -- 추가 요청사항
  
  -- 연락 정보
  contact TEXT, -- 연락처
  contact_type TEXT, -- 'phone', 'visit'
  contact_time TEXT, -- 희망 연락 시간
  
  -- 상태 관리
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'in_progress', 'completed'
  admin_memo TEXT, -- 관리자 메모
  assigned_to INTEGER, -- 담당자 (admin user_id)
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (payment_id) REFERENCES payments(id)
);

-- 4. 쿠폰 테이블
CREATE TABLE IF NOT EXISTS coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER, -- 쿠폰 소유자
  
  -- 쿠폰 정보
  code TEXT UNIQUE NOT NULL, -- 쿠폰 코드
  name TEXT NOT NULL, -- 쿠폰명 (예: "추천인 10% 할인")
  type TEXT NOT NULL, -- 'percent', 'fixed'
  value INTEGER NOT NULL, -- 할인율(%) 또는 고정금액(원)
  
  -- 사용 조건
  min_amount INTEGER DEFAULT 0, -- 최소 결제 금액
  max_discount INTEGER, -- 최대 할인 금액 (percent 타입용)
  
  -- 유효기간
  valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
  valid_until DATETIME,
  
  -- 상태
  status TEXT DEFAULT 'active', -- 'active', 'used', 'expired', 'cancelled'
  used_at DATETIME,
  used_payment_id INTEGER, -- 어떤 결제에 사용됐는지
  
  -- 발급 사유
  issued_reason TEXT, -- 'referral', 'welcome', 'event', 'manual'
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (used_payment_id) REFERENCES payments(id)
);

-- 5. 추천 관계 테이블
CREATE TABLE IF NOT EXISTS referrals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  referrer_id INTEGER NOT NULL, -- 추천한 사람
  referred_id INTEGER NOT NULL, -- 추천받은 사람 (신규가입자)
  
  -- 보상 정보
  referrer_coupon_id INTEGER, -- 추천인에게 발급된 쿠폰
  referred_coupon_id INTEGER, -- 신규가입자에게 발급된 쿠폰
  
  -- 상태
  status TEXT DEFAULT 'pending', -- 'pending', 'completed' (첫 결제 완료시)
  first_payment_id INTEGER, -- 신규가입자의 첫 결제
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (referrer_id) REFERENCES users(id),
  FOREIGN KEY (referred_id) REFERENCES users(id),
  FOREIGN KEY (referrer_coupon_id) REFERENCES coupons(id),
  FOREIGN KEY (referred_coupon_id) REFERENCES coupons(id)
);

-- 6. 상품별 할일 (Task) 테이블
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id INTEGER NOT NULL,
  user_id INTEGER,
  
  -- 할일 정보
  title TEXT NOT NULL, -- 할일 제목
  description TEXT, -- 상세 설명
  category TEXT, -- 'setup', 'content', 'review', 'report' 등
  
  -- 진행 상태
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
  priority INTEGER DEFAULT 2, -- 1: 높음, 2: 보통, 3: 낮음
  
  -- 기한
  due_date DATE,
  completed_at DATETIME,
  
  -- 담당
  assigned_to INTEGER, -- 담당자 (admin user_id)
  
  -- 메모
  admin_memo TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 7. 알림 로그 테이블
CREATE TABLE IF NOT EXISTS notification_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  
  -- 알림 정보
  type TEXT NOT NULL, -- 'sms', 'kakao', 'email'
  template TEXT, -- 템플릿 종류
  recipient TEXT NOT NULL, -- 수신자 (전화번호 또는 이메일)
  content TEXT, -- 발송 내용
  
  -- 상태
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  sent_at DATETIME,
  error_message TEXT,
  
  -- 관련 정보
  related_type TEXT, -- 'payment', 'questionnaire' 등
  related_id INTEGER,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ========================================
-- 인덱스 생성
-- ========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_referred_by ON users(referred_by);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_next_payment_date ON payments(next_payment_date);
CREATE INDEX IF NOT EXISTS idx_questionnaires_user_id ON questionnaires(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaires_status ON questionnaires(status);
CREATE INDEX IF NOT EXISTS idx_coupons_user_id ON coupons(user_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_status ON coupons(status);
CREATE INDEX IF NOT EXISTS idx_tasks_payment_id ON tasks(payment_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
