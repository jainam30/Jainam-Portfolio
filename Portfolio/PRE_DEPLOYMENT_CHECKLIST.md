# Pre-Deployment Checklist

## Before Running `npm run build`

### 1. Code Quality
- [ ] No console.log() statements left (except intentional logging)
- [ ] No commented-out code blocks
- [ ] All imports are used
- [ ] No TypeScript errors (if using TS)

### 2. Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] Build time is reasonable (<60s)
- [ ] No warnings about deprecated features

### 3. Production Test
```bash
npm run start
```
- [ ] App starts without errors
- [ ] All pages load (/, /about, etc.)
- [ ] No 404 errors in console

### 4. Visual Verification (http://localhost:3000)

#### Header & Navigation
- [ ] Navbar sticky at top
- [ ] All nav links work (About, Skills, Projects, Contact)
- [ ] Logo clickable (if desired)

#### Hero Section
- [ ] VoltageButton visible and animated
- [ ] "View Projects" link works
- [ ] Background/Scene renders properly
- [ ] Mobile responsive

#### About Section
- [ ] CV card visible on left
- [ ] GradientCard with About text on right
- [ ] Text readable on white panel
- [ ] "Download CV" button works (downloads Jainam_Jain_CV.pdf)
- [ ] Mobile: stacks properly

#### Skills Section
- [ ] GradientCards show for each skill
- [ ] Text visible on white panels
- [ ] Animations smooth
- [ ] Mobile responsive

#### Projects Section
- [ ] Project cards show with gradients
- [ ] Text readable
- [ ] Links clickable (if external projects)
- [ ] Mobile grid responsive

#### Experience Section
- [ ] All 3 cards visible (BCA, MCA, Internship)
- [ ] GradientCards render properly
- [ ] Text readable
- [ ] Mobile responsive

#### Contact Section
- [ ] Contact form fields visible
- [ ] Form validation works
- [ ] Phone/email links functional
- [ ] Submit button works
- [ ] Success message appears after submit
- [ ] Mobile form responsive

#### Footer
- [ ] GradientCard visible
- [ ] Copyright year correct
- [ ] Social buttons visible (LinkedIn, GitHub, Discord)
- [ ] Social links open in new tabs

### 5. Responsive Design Check

#### Mobile (375px width)
- [ ] All text readable
- [ ] Buttons clickable
- [ ] No horizontal scroll
- [ ] Images scale properly
- [ ] Form inputs usable

#### Tablet (768px width)
- [ ] Layout adjusts correctly
- [ ] Grid columns respond
- [ ] Cards stack appropriately

#### Desktop (1200px+ width)
- [ ] Full multi-column layouts
- [ ] Spacing consistent
- [ ] No text overflow

**Use DevTools:** Press F12 → Toggle Device Toolbar (Ctrl+Shift+M)

### 6. Performance Check

#### Lighthouse (DevTools → Lighthouse)
- [ ] Performance: >80
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

#### Network (DevTools → Network tab)
- [ ] Total page size: <5MB
- [ ] JS bundle: <500KB
- [ ] No failed requests
- [ ] No 404s

### 7. Browser Compatibility

Test in:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (if Mac available)
- [ ] Edge (if Windows)

### 8. Accessibility Check

- [ ] Keyboard navigation works (Tab through all buttons/links)
- [ ] Focus outlines visible on all interactive elements
- [ ] Color contrast meets WCAG AA standards
- [ ] All images have alt text (if any)
- [ ] Form labels associated with inputs

### 9. SEO Preparation

- [ ] Title tag descriptive (`<title>Jainam Jain | Portfolio</title>`)
- [ ] Meta description set
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Favicon present
- [ ] robots.txt correct
- [ ] sitemap.xml created (Next.js auto-generates)

### 10. Environment Variables

- [ ] `.env.local` created (if needed for email/API keys)
- [ ] No sensitive data in code
- [ ] All API endpoints configured
- [ ] Contact form email service configured (if sending emails)

### 11. Final Build

```bash
npm run build
npm run start
```

- [ ] Build size acceptable
- [ ] No runtime errors
- [ ] All features working
- [ ] Ready to deploy!

---

## Deployment Checklist

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy on Vercel**
   - [ ] GitHub repo connected
   - [ ] Main branch selected
   - [ ] Environment variables added (if any)
   - [ ] Deploy clicked
   - [ ] Wait for build to complete

3. **Post-Deploy Verification**
   - [ ] Live URL works (yourdomain.vercel.app)
   - [ ] All pages load
   - [ ] No console errors
   - [ ] Contact form works
   - [ ] CV download works

4. **Custom Domain (Optional)**
   - [ ] Domain purchased
   - [ ] DNS records added to Vercel
   - [ ] SSL certificate auto-provisioned
   - [ ] Domain resolves correctly

### Alternative Deployments

#### Netlify
- [ ] Connect GitHub repo
- [ ] Auto-deploy enabled
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`

#### Other Platforms
- [ ] Follow platform-specific deployment steps
- [ ] Ensure Node.js 18+ available
- [ ] Set build command correctly
- [ ] Verify environment variables

---

## Post-Deployment

- [ ] Share portfolio link with contacts
- [ ] Update LinkedIn with portfolio URL
- [ ] Test from phone/tablet one more time
- [ ] Monitor for errors (Vercel dashboard or platform logs)
- [ ] Keep GitHub updated with changes

---

## Rollback Plan (If Issues)

1. Revert deployment:
   ```bash
   git revert HEAD
   git push origin main
   # Vercel auto-redeploys
   ```

2. Check logs:
   - Vercel: Dashboard → Deployments → View Logs
   - Local: `npm run build && npm run dev`

3. Debug:
   - Browser console: DevTools (F12)
   - Server logs: Check terminal output
   - Network: See failed requests in DevTools

---

## Success Criteria

✅ Portfolio is live and accessible
✅ All pages load without errors
✅ Responsive on mobile/tablet/desktop
✅ Contact form works
✅ CV download works
✅ Social links work
✅ No console errors
✅ Fast performance (Lighthouse >80)
