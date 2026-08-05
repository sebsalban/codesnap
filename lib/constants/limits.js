// Guard rails for pasted code. Shiki tokenizes on the main thread and
// html-to-image captures at 3x resolution, so unbounded input can freeze
// the tab. The warning nudges before the hard cap cuts off.
export const CODE_WARN_LENGTH = 10000;
export const MAX_CODE_LENGTH = 20000;
