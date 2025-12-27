-- ========================================
-- 사이트 설정 테이블 (관리자에서 실시간 수정 가능)
-- ========================================

-- 사이트 설정 테이블
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type TEXT DEFAULT 'text', -- 'text', 'number', 'json', 'html'
  category TEXT DEFAULT 'general', -- 'general', 'hero', 'stats', 'services', 'portfolio'
  label TEXT, -- 관리자에서 표시할 라벨
  description TEXT, -- 설정 설명
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 포트폴리오 카테고리 테이블
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 포트폴리오 항목 테이블
CREATE TABLE IF NOT EXISTS portfolio_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  title TEXT NOT NULL,
  url TEXT,
  thumbnail TEXT,
  description TEXT,
  is_video INTEGER DEFAULT 0,
  video_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES portfolio_categories(id)
);

-- 기본 사이트 설정 삽입
INSERT OR IGNORE INTO site_settings (setting_key, setting_value, setting_type, category, label, description) VALUES
-- 히어로 섹션
('hero_badge', 'XIVIX Business Engineering', 'text', 'hero', '히어로 배지', '히어로 섹션 상단 배지 텍스트'),
('hero_title', '사장님은 장사만 하세요', 'text', 'hero', '히어로 타이틀', '메인 타이틀 첫 줄'),
('hero_title_accent', '마케팅은 AI가 다 해드립니다', 'text', 'hero', '히어로 서브타이틀', '메인 타이틀 두번째 줄 (색상 강조)'),
('hero_description', '직원 뽑지 마세요. 블로그, 인스타, 영상 편집...\nXIVIX AI 시스템이 월급 없이 24시간 일합니다.', 'text', 'hero', '히어로 설명', '메인 설명 텍스트'),
('hero_video_url', '', 'text', 'hero', '히어로 비디오 URL', 'MP4 비디오 URL (비워두면 기본 비디오 사용)'),

-- 통계 섹션
('stat_1_value', '-90', 'text', 'stats', '통계1 값', '첫번째 통계 수치'),
('stat_1_unit', '%', 'text', 'stats', '통계1 단위', '첫번째 통계 단위'),
('stat_1_label', '시간 절감', 'text', 'stats', '통계1 라벨', '첫번째 통계 라벨'),
('stat_2_value', '-70', 'text', 'stats', '통계2 값', '두번째 통계 수치'),
('stat_2_unit', '%', 'text', 'stats', '통계2 단위', '두번째 통계 단위'),
('stat_2_label', '비용 절감', 'text', 'stats', '통계2 라벨', '두번째 통계 라벨'),
('stat_3_value', '+250', 'text', 'stats', '통계3 값', '세번째 통계 수치'),
('stat_3_unit', '%', 'text', 'stats', '통계3 단위', '세번째 통계 단위'),
('stat_3_label', '문의량 증가', 'text', 'stats', '통계3 라벨', '세번째 통계 라벨'),

-- AI 입문반 배너
('edu_banner_badge', '선착순 마감', 'text', 'banner', '배너 배지', '입문반 배너 배지 텍스트'),
('edu_banner_title', 'AI 입문반 1기', 'text', 'banner', '배너 타이틀', '입문반 배너 제목'),
('edu_banner_original_price', '₩300만', 'text', 'banner', '원래 가격', '할인 전 가격'),
('edu_banner_price', '₩200만 / 6주', 'text', 'banner', '할인 가격', '할인 후 가격 및 기간'),
('edu_banner_enabled', '1', 'text', 'banner', '배너 활성화', '1: 활성화, 0: 비활성화'),

-- 일반 설정
('site_name', 'X I Λ I X', 'text', 'general', '사이트 이름', '사이트 로고 텍스트'),
('contact_phone', '02-1234-5678', 'text', 'general', '연락처', '대표 전화번호'),
('contact_email', 'contact@xivix.kr', 'text', 'general', '이메일', '대표 이메일');

-- 기본 포트폴리오 카테고리 삽입
INSERT OR IGNORE INTO portfolio_categories (name, slug, icon, color, sort_order) VALUES
('브랜딩', 'branding', 'fa-gem', '#1e90ff', 1),
('뷰티', 'beauty', 'fa-spa', '#00ff88', 2),
('커머스', 'commerce', 'fa-shopping-bag', '#22d3ee', 3),
('시스템/AI', 'system', 'fa-robot', '#f97316', 4),
('콘텐츠', 'content', 'fa-photo-video', '#a855f7', 5),
('랜딩페이지', 'landing', 'fa-rocket', '#ef4444', 6),
('영상', 'video', 'fa-video', '#fbbf24', 7);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_active ON portfolio_items(is_active);
