# Bug Hunt — xolto-landing

Use this skill to investigate and fix bugs. Follows a reproduce-diagnose-patch-verify cycle.

## Steps

### 1. Reproduce

- Understand the reported behavior and expected behavior
- Start the dev server if needed: `npm run dev`
- Identify the exact component/route where the bug occurs

### 2. Diagnose

- Read the relevant component files
- Check the browser console for errors (if runtime issue)
- Check build output for warnings: `npm run build`
- Trace the issue to its root cause — don't just fix symptoms

### 3. Summarize

Before patching, state:

- **Root cause**: what exactly is wrong and why
- **Affected files**: which files need changes
- **Risk**: what else could break from the fix

### 4. Patch

- Make the minimal fix that addresses the root cause
- Prefer Tailwind/CSS fixes for layout issues
- Prefer next/font and framework conventions over ad hoc solutions
- Don't refactor unrelated code

### 5. Verify

```
npm run build
npm run typecheck
npm run lint
```

All must pass. If UI was affected, check at both mobile (375px) and desktop widths.
