# Design Document: 2026 웅진마켓 패밀리데이 이벤트 페이지

## Overview

이 디자인은 HTML5, CSS3, 그리고 바닐라 JavaScript를 사용하여 반응형 이벤트 랜딩 페이지를 구현합니다. 한국 전통 설날 테마를 현대적인 웹 디자인과 결합하여 시각적으로 매력적이고 사용자 친화적인 경험을 제공합니다.

단일 HTML 파일 구조로 구현하여 배포와 유지보수를 간소화하며, CSS는 인라인 스타일 또는 `<style>` 태그로, JavaScript는 `<script>` 태그로 포함합니다.

## Architecture

### 기술 스택
- **HTML5**: 시맨틱 마크업과 구조
- **CSS3**: 스타일링, 애니메이션, 반응형 레이아웃 (Flexbox/Grid)
- **Vanilla JavaScript**: 최소한의 인터랙션 (필요시)

### 파일 구조
```
yongjin-family-day.html (단일 파일)
├── HTML 구조
├── <style> CSS 스타일
└── <script> JavaScript (선택적)
```

### 레이아웃 구조
```
┌─────────────────────────────────────┐
│         Header Section              │
│  - 장식 요소 (매화, 새, 연)          │
│  - 메인 타이틀 (3D 풍선 스타일)      │
│  - 이벤트 기간                       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│      Benefits Section               │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │Card1│  │Card2│  │Card3│         │
│  └─────┘  └─────┘  └─────┘         │
└─────────────────────────────────────┘
```

## Components and Interfaces

### 1. Header Component

**구조:**
```html
<header class="event-header">
  <div class="decorations">
    <!-- 매화꽃, 새, 연 SVG/이미지 -->
  </div>
  <h1 class="event-title">2026 웅진마켓 패밀리데이<br>FAMILY DAY</h1>
  <p class="event-period">26.02.03 — 02.05</p>
</header>
```

**스타일 특징:**
- 3D 풍선 효과: `text-shadow`, `transform`, `gradient` 사용
- 파스텔 하늘색 배경: `background: linear-gradient(to bottom, #E3F2FD, #BBDEFB)`
- 전통 장식 요소: CSS로 구현하거나 SVG 인라인 삽입

### 2. Benefit Card Component

**구조:**
```html
<div class="benefit-card">
  <div class="card-icon">
    <!-- SVG 아이콘 -->
  </div>
  <h3 class="card-title">웅진마켓 회원</h3>
  <p class="card-benefit">적립금 2,000원</p>
  <p class="card-detail">즉시사용</p>
</div>
```

**카드 데이터:**
1. **Card 1**: 동전 아이콘, "웅진마켓 회원", "적립금 2,000원", "즉시사용"
2. **Card 2**: 지폐 아이콘, "구매금액", "10% 페이백"
3. **Card 3**: 카드 아이콘, "비씨카드", "10% 할인"

**스타일 특징:**
- 흰색 배경, 둥근 모서리 (`border-radius: 20px`)
- 그림자 효과 (`box-shadow: 0 4px 12px rgba(0,0,0,0.1)`)
- 호버 효과: `transform: translateY(-5px)`, `box-shadow` 증가

### 3. Benefits Container

**구조:**
```html
<section class="benefits-section">
  <div class="benefits-container">
    <!-- 3개의 benefit-card -->
  </div>
</section>
```

**레이아웃:**
- Desktop (≥768px): `display: flex`, `justify-content: space-around`
- Mobile (<768px): `flex-direction: column`, `align-items: center`

## Data Models

이 프로젝트는 정적 콘텐츠이므로 복잡한 데이터 모델이 필요하지 않습니다. 모든 데이터는 HTML 마크업에 직접 포함됩니다.

**Benefit Card 데이터 구조 (개념적):**
```javascript
{
  icon: "coin|bill|card",
  title: string,
  benefit: string,
  detail: string (optional)
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Exactly Three Benefit Cards
*For any* rendered state of the Event_Page, the benefits section should contain exactly 3 benefit cards.
**Validates: Requirements 2.1**

### Property 2: Mobile Viewport Vertical Stacking
*For any* viewport width less than 768px, the benefit cards should be stacked vertically (flex-direction: column or equivalent).
**Validates: Requirements 3.1**

### Property 3: Desktop Viewport Horizontal Layout
*For any* viewport width of 768px or greater, the benefit cards should be displayed horizontally (flex-direction: row or equivalent).
**Validates: Requirements 3.2**

### Property 4: Layout Integrity
*For any* viewport size, decorative elements should not cause horizontal scrolling or overflow beyond the viewport boundaries.
**Validates: Requirements 3.4**

### Property 5: Touch Target Minimum Size
*For any* interactive element on mobile viewports (width < 768px), the element should have minimum dimensions of 44x44 pixels.
**Validates: Requirements 3.5**

### Property 6: WCAG AA Contrast Compliance
*For any* text element on the page, the contrast ratio between text and background should meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
**Validates: Requirements 4.3**

### Property 7: Typography Consistency
*For any* text element within the same semantic category (e.g., all card titles), the font-family should be consistent.
**Validates: Requirements 4.4**

### Property 8: Semantic HTML Structure
*For any* major section of the page (header, benefits section), semantic HTML5 elements (header, section, article, etc.) should be used instead of generic div elements.
**Validates: Requirements 5.1**

### Property 9: Image Alt Text Presence
*For any* img or decorative SVG element, an appropriate alt attribute or aria-label should be present.
**Validates: Requirements 5.2**

### Property 10: Keyboard Navigation Support
*For any* interactive element (links, buttons), the element should be keyboard accessible (reachable via Tab key and activatable via Enter/Space).
**Validates: Requirements 5.3**

### Property 11: ARIA Labels for Accessibility
*For any* non-text content or complex interactive element, appropriate ARIA labels or roles should be present for screen reader compatibility.
**Validates: Requirements 5.4**

## Error Handling

이 프로젝트는 정적 HTML 페이지이므로 런타임 에러 처리가 최소화됩니다. 그러나 다음 사항을 고려합니다:

### 1. 이미지 로딩 실패
- **전략**: SVG를 인라인으로 포함하여 외부 이미지 의존성 제거
- **대체**: SVG 로딩 실패 시 CSS로 구현된 대체 장식 요소 표시

### 2. CSS 미지원 브라우저
- **전략**: 기본 레이아웃이 CSS 없이도 읽을 수 있도록 시맨틱 HTML 사용
- **대체**: Flexbox 미지원 시 기본 블록 레이아웃으로 폴백

### 3. JavaScript 비활성화
- **전략**: 모든 핵심 콘텐츠는 JavaScript 없이 표시되도록 구현
- **사용**: JavaScript는 선택적 애니메이션이나 인터랙션에만 사용

### 4. 접근성 문제
- **전략**: ARIA 레이블과 시맨틱 HTML로 스크린 리더 호환성 보장
- **검증**: 키보드 네비게이션과 포커스 관리 테스트

## Testing Strategy

이 프로젝트는 정적 웹 페이지이므로 테스팅 전략은 수동 테스트와 자동화된 검증 도구를 결합합니다.

### Unit Testing Approach

**도구**: Jest + jsdom (HTML/CSS 구조 검증용)

**테스트 범위**:
- DOM 구조 검증 (예: 3개의 카드가 존재하는지)
- 특정 텍스트 콘텐츠 존재 확인
- HTML5 유효성 검증
- 접근성 속성 존재 확인 (alt text, ARIA labels)

**예시 단위 테스트**:
```javascript
// 예시: 3개의 benefit card가 존재하는지 확인
test('should render exactly 3 benefit cards', () => {
  const cards = document.querySelectorAll('.benefit-card');
  expect(cards.length).toBe(3);
});

// 예시: 첫 번째 카드의 콘텐츠 확인
test('first card should contain correct content', () => {
  const card1 = document.querySelectorAll('.benefit-card')[0];
  expect(card1.textContent).toContain('웅진마켓 회원');
  expect(card1.textContent).toContain('적립금 2,000원');
});
```

### Property-Based Testing Approach

**도구**: fast-check (JavaScript property-based testing library)

**설정**: 각 property test는 최소 100회 반복 실행

**테스트 범위**:
- 반응형 레이아웃 동작 (다양한 viewport 크기)
- 접근성 규칙 (WCAG 대비, 키보드 네비게이션)
- 타이포그래피 일관성
- 레이아웃 무결성

**예시 property test**:
```javascript
// Feature: yongjin-market-family-day, Property 2: Mobile Viewport Vertical Stacking
test('cards should stack vertically on mobile viewports', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 320, max: 767 }), // 모바일 viewport 범위
      (width) => {
        // viewport 설정
        window.innerWidth = width;
        // 레이아웃 재계산
        const container = document.querySelector('.benefits-container');
        const computedStyle = window.getComputedStyle(container);
        // flex-direction이 column인지 확인
        return computedStyle.flexDirection === 'column';
      }
    ),
    { numRuns: 100 }
  );
});
```

### Visual Regression Testing

**도구**: Percy 또는 Chromatic (선택적)

**테스트 범위**:
- 다양한 viewport 크기에서 스크린샷 비교
- 브라우저 간 렌더링 일관성 확인

### Accessibility Testing

**도구**: 
- axe-core (자동화된 접근성 검사)
- WAVE (웹 접근성 평가 도구)
- 수동 키보드 네비게이션 테스트

**테스트 범위**:
- WCAG AA 준수 확인
- 스크린 리더 호환성
- 키보드 네비게이션
- 색상 대비 검증

### Browser Compatibility Testing

**도구**: BrowserStack 또는 수동 테스트

**테스트 범위**:
- Chrome (최신 2 버전)
- Firefox (최신 2 버전)
- Safari (최신 2 버전)
- Edge (최신 2 버전)

### HTML/CSS Validation

**도구**:
- W3C HTML Validator
- W3C CSS Validator

**테스트 범위**:
- HTML5 마크업 유효성
- CSS3 문법 유효성

### Testing Balance

이 프로젝트는 정적 페이지이므로:
- **Unit tests**: 구조적 요소와 콘텐츠 존재 확인에 집중
- **Property tests**: 반응형 동작과 접근성 규칙 검증에 집중
- **Manual tests**: 시각적 디자인과 사용자 경험 검증에 집중

Property-based testing은 다양한 viewport 크기와 접근성 시나리오를 자동으로 테스트하여 edge case를 발견하는 데 특히 유용합니다.

