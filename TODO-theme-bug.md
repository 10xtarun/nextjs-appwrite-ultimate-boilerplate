# Theme Bug: Light/Dark Mode Font & Color Issue

## Description

- When switching between dark and light modes, the font and text colors are not always correct in light mode.
- In dark mode, everything looks perfect.
- In light mode, some text or backgrounds may be hard to read or visually inconsistent.
- Attempts to fix by enforcing Tailwind global classes and removing CSS overrides have not fully resolved the issue.

## Suspected Causes

- Some components may still be using fixed color/background CSS or variables.
- Global Tailwind classes might be overridden by legacy CSS or not applied at the right level.
- There may be a conflict between custom CSS and Tailwind's `dark:` classes.

## Steps to Reproduce

1. Open the app.
2. Toggle between dark and light mode using the navbar toggle.
3. Observe that dark mode is correct, but light mode has font/color issues.

## References

- See `/src/app/layout.tsx` and `/src/app/globals.css` for global theme logic.
- See `/src/app/_shared/components/navigation/navbar.tsx` and main section/card components for local theming.

## Next Steps

- Audit all components for hardcoded color/background CSS.
- Ensure all backgrounds/text use Tailwind's `bg-*` and `text-*` classes with `dark:` variants.
- Remove any remaining custom CSS variables for color.
- Test with only Tailwind classes for theming.

---

_Logged on 2025-04-19. To be fixed in a future sprint._
