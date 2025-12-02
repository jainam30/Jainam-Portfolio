# Design System & Component Rules

## Core Rule: Never Break Component Styles
All UI component styles are scoped within styled-components and should remain isolated from global styles.

---

## 1. GradientCard Component Rules

### Location
`src/components/common/GradientCard.jsx`

### Critical Rules
- ✅ **Text Color**: ALWAYS use `!important` on content text colors to prevent global style override
  ```css
  .gradient-card .content h1, 
  .gradient-card .content p { 
    color: #1c1c1e !important; 
  }
  ```
- ✅ **Inner White Panel**: Must have `inset: 6px` padding with `::after` pseudo-element
- ✅ **Animation**: Keyframes must be scoped via styled-components `keyframes()`, NOT in globals.css
- ✅ **Z-index Layer**: Maintain z-index hierarchy:
  - `::before` (gradient background) = `z-index: 0`
  - `::after` (white panel) = `z-index: 1`
  - `.gradient-overlay` = `z-index: 2`
  - `.content` = `z-index: 3`

### When Modifying
- DO NOT move animation keyframes to globals.css
- DO NOT change text color without `!important`
- DO NOT alter z-index stacking order
- DO verify component renders on About, Footer, Projects, Skills, Experience pages

### Testing
```bash
# Always verify after changes:
npm run build
npm run dev
# Check: http://localhost:3000/about (should show visible text on white panel)
```

---

## 2. Component Color Contract

### Text on White Panels
- Use `#1c1c1e` with `!important` for all child text elements
- Alternative: `#000` (black) if darker needed
- Avoid: `#07182e` (too dark/blue, doesn't work reliably)

### Component Isolation
- Each component's styles MUST be in its own styled-component
- DO NOT rely on globals.css for component-specific styling
- Example:
  ```jsx
  // ✅ Good
  const StyledWrapper = styled.div`
    .my-component { color: #1c1c1e !important; }
  `;
  
  // ❌ Bad
  // styles in globals.css → will conflict with global rules
  ```

---

## 3. Components Using This System

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| GradientCard | `src/components/common/GradientCard.jsx` | ✅ Stable | Scoped keyframes, !important text colors |
| CvCard | `src/components/common/CvCard.jsx` | ✅ Stable | Hover state via JS, no Tailwind conflicts |
| VoltageButton | `src/components/common/VoltageButton.jsx` | ✅ Stable | SVG filters, scoped animation |
| Button (Social Tiles) | `src/components/common/Button.jsx` | ✅ Stable | Brand colors, subtle tints |
| Header | `src/components/layout/Header.jsx` | ✅ Stable | Clean navbar, no pattern overlay |
| Footer | `src/components/layout/Footer.jsx` | ✅ Stable | GradientCard + Button integration |

---

## 4. Style Conflict Prevention Checklist

When making ANY changes to components or pages:

- [ ] **Check for Text Color Overrides**: Verify text is readable on white panels
  - Pages using GradientCard: About, Footer, Projects, Skills, Experience
  - Rule: If text isn't visible, add `!important` to the text color rule

- [ ] **Verify Keyframe Isolation**: Animation keyframes are in styled-components, not globals.css
  - Search: `@keyframes` in `globals.css`
  - Should only find: `rotateAnim` (kept for reference, but GradientCard uses its own)

- [ ] **Check Z-index Stacking**: If layers appear wrong, verify z-index order
  - Background layers: 0–2
  - Content layer: 3
  - Example: If white panel disappears, check if `::after` z-index < `::before`

- [ ] **Tailwind Class Conflicts**: Avoid mixing Tailwind utilities that set same properties
  - Bad: `transform-gpu [transform:...]` (duplicate transform)
  - Good: Use inline `style={{ transform: '...' }}` or scoped CSS

- [ ] **Build & Test**: After changes, always run:
  ```bash
  npm run build
  npm run dev
  ```
  - If build fails: Check for CSS syntax errors
  - If styles break: Check for missing `!important` or z-index conflicts

---

## 5. Global Styles (globals.css) - Keep Minimal

**Only use globals.css for:**
- Tailwind imports
- Font imports
- Root CSS variables (--bg, --text, --muted, --card)
- Generic utility classes (.reveal, .card, .title-grad, .scene, .depth-card)

**DO NOT add:**
- Component-specific keyframes (use styled-components instead)
- Component-specific selectors (use scoped CSS in components)
- Pseudo-element styles (use component CSS)

---

## 6. Safe Refactoring Pattern

When modifying a component's styles:

1. **Read Current Component**
   ```bash
   cat src/components/common/GradientCard.jsx
   ```

2. **Identify Scoped Styles**
   - Find the `const StyledWrapper = styled.div\`...\`` block
   - Never move rules outside this block

3. **Make Changes**
   - Keep keyframes inside styled-component
   - Keep text color rules with `!important`
   - Keep z-index stacking intact

4. **Test**
   ```bash
   npm run build
   # If errors: revert and check globals.css for conflicts
   npm run dev
   # Visual check: text visible? animations smooth? colors correct?
   ```

5. **Verify on All Pages**
   - About (GradientCard + CvCard)
   - Footer (GradientCard + Button)
   - Projects (GradientCard list)
   - Skills (GradientCard list)
   - Experience (GradientCard list)

---

## 7. Emergency Rollback

If styles break after a change:

1. **Check Recent File Edits**
   ```bash
   git log --oneline -5
   ```

2. **Revert Last Change**
   ```bash
   git checkout HEAD -- src/components/common/GradientCard.jsx
   # or affected file
   ```

3. **Verify Build**
   ```bash
   npm run build && npm run dev
   ```

4. **Identify Root Cause**
   - Text not visible? → Missing `!important`
   - Animation broken? → Keyframes moved to globals.css
   - Layers misaligned? → Z-index conflict
   - Build failed? → CSS syntax error

5. **Reapply Fix Safely**
   - Use scoped CSS (styled-components)
   - Add `!important` where needed
   - Keep animations in component file

---

## 8. Testing Checklist (Before Deployment)

Run this before every `npm run build`:

```bash
# 1. Build check
npm run build

# 2. Start production server
npm run start

# 3. Open http://localhost:3000 and verify:
# [ ] Header loads cleanly
# [ ] About page: CV card visible, text readable on white panel
# [ ] Footer: GradientCard shows, social buttons work
# [ ] Projects: Cards show gradients, text visible
# [ ] Skills: Cards render, text visible
# [ ] Experience: All 3 cards visible and readable
# [ ] Contact: Form loads, submit works
# [ ] Mobile: All responsive (check DevTools mobile view)

# 4. Check console for errors (DevTools F12)
# [ ] No 404s
# [ ] No styled-components warnings
# [ ] No hydration mismatches

# 5. Final test
npm run dev
# (keep dev server running for live preview)
```

---

## Summary: The Golden Rules

1. **Component styles are scoped** → Use styled-components for each component
2. **Text on white needs `!important`** → Prevent global overrides
3. **Animations are component-local** → Use `keyframes()` inside styled-components
4. **Z-index is hierarchical** → Background (0-2), Content (3)
5. **Globals are minimal** → Only Tailwind, fonts, variables, generic utilities
6. **Build + test always** → `npm run build && npm run dev`
7. **Never move scoped CSS to globals** → Causes conflicts
8. **Verify on all pages** → GradientCard used in 5+ places

---

## Questions?

If styles break:
1. Check this document for the rule that was violated
2. Look for `!important` conflicts
3. Search for duplicate keyframes in globals.css
4. Verify z-index stacking
5. Revert last change if unsure
