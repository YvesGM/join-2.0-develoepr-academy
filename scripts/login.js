/**
 * Login splash animation controller.
 * Desktop Welcome crossfades the centered logo; mobile moves it into the header.
 */

/** Starts the splash animation for the active login/welcome view. */
function runSplashAnimation() {
  const elements = getSplashElements();
  if (!elements) return;
  setSplashTheme(elements);
  if (handleSkippedSplash(elements)) return;
  if (isIssueCollectorWelcome() && !isMobileSplash()) return playWelcomeSplash(elements);
  playSplashAnimation(elements);
}

/** @returns {boolean} Whether the public role-selection view is active. */
function isIssueCollectorWelcome() {
  return document.body.classList.contains('issue-welcome-active');
}

/** @returns {boolean} Whether the mobile splash behavior applies. */
function isMobileSplash() {
  return window.matchMedia('(max-width: 768px)').matches;
}

/** Crossfades the desktop Welcome splash using the Figma prototype timing. */
function playWelcomeSplash(elements) {
  setHeaderLogoVisibility(elements.headerLogo, false);
  const targets = [elements.splashBg, elements.splashLogo, elements.splashLogoEnd];
  const animations = targets.map(fadeWelcomeElement);
  Promise.all(animations.map(animation => animation.finished))
    .then(() => finishSplashAnimation(elements));
}

/** @returns {Animation} Fade animation for one Welcome splash element. */
function fadeWelcomeElement(element) {
  return element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1200, delay: 200, easing: 'ease-in-out', fill: 'forwards'
  });
}

/** Applies an explicit one-time skip request and finalizes immediately. */
function handleSkippedSplash(elements) {
  if (!shouldSkipSplash()) return false;
  clearSkipSplash();
  showFinalSplashState(elements);
  return true;
}

/** Starts the moving logo animation used by login and mobile Welcome. */
function playSplashAnimation(elements) {
  const context = getSplashAnimationContext(elements);
  const animations = startSplashLogoAnimations(elements, context);
  const overlayAnimation = fadeOutOverlay(elements.splashBg, 500, 1000);
  syncAnimationEnd(animations, overlayAnimation, elements);
}

/** @returns {{startScale:number,endScale:number,delta:{x:number,y:number}}} */
function getSplashAnimationContext(elements) {
  const endRect = elements.headerLogo.getBoundingClientRect();
  const startScale = getResponsiveSplashStartScale(getSplashStartScale(endRect.height));
  prepareSplashElementsForAnimation(elements, startScale);
  const delta = getCenterDelta(elements.splashLogo, endRect);
  const endScale = getSplashEndScale(elements.splashLogo, endRect);
  return { startScale, endScale, delta };
}

/** Prepares both transient splash logos at viewport center. */
function prepareSplashElementsForAnimation(elements, startScale) {
  prepareSplashLogo(elements.splashLogo, startScale);
  prepareSplashLogo(elements.splashLogoEnd, startScale);
  setHeaderLogoVisibility(elements.headerLogo, false);
}

/** Starts the main and end-state logo animations. */
function startSplashLogoAnimations(elements, context) {
  const args = [context.startScale, context.endScale, context.delta];
  return [
    animateSplashLogo(elements.splashLogo, ...args, 1, 0.2),
    animateSplashLogo(elements.splashLogoEnd, ...args, 0, 1)
  ];
}

/** Selects the correct logo contrast for desktop/mobile splash. */
function setSplashTheme({ splashLogo, splashLogoEnd, headerLogo }) {
  const mobile = isMobileSplash();
  const source = mobile ? './assets/img/join_logo.svg' : './assets/img/join_logo_dark.svg';
  splashLogo.src = source;
  splashLogoEnd.src = source;
  if (headerLogo) headerLogo.src = source;
}

/** @returns {{splashLogo:HTMLElement,splashLogoEnd:HTMLElement,headerLogo:HTMLElement,splashBg:HTMLElement}|null} */
function getSplashElements() {
  const splashLogo = document.querySelector('.login-splash-logo');
  const splashLogoEnd = document.querySelector('.login-splash-logo-end');
  const headerLogo = document.querySelector('.login-logo');
  const splashBg = document.querySelector('.login-splash');
  if (!splashLogo || !splashLogoEnd || !headerLogo || !splashBg) return null;
  return { splashLogo, splashLogoEnd, headerLogo, splashBg };
}

/** Sets a splash logo's centered start state. */
function prepareSplashLogo(splashLogo, startScale) {
  splashLogo.style.left = '50%';
  splashLogo.style.top = '50%';
  splashLogo.style.transform = `translate(-50%, -50%) scale(${startScale})`;
  splashLogo.style.display = 'block';
}

/** @returns {{x:number,y:number}} Distance from splash center to final header center. */
function getCenterDelta(splashLogo, endRect) {
  const startRect = splashLogo.getBoundingClientRect();
  return {
    x: endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2),
    y: endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2)
  };
}

/** Animates a splash logo from center into the header position. */
function animateSplashLogo(splashLogo, startScale, endScale, delta, fromOpacity = 1, toOpacity = 1) {
  const keyframes = buildSplashAnimationKeyframes(startScale, endScale, delta, fromOpacity, toOpacity);
  return splashLogo.animate(keyframes, getSplashAnimationOptions());
}

/** @returns {Keyframe[]} Splash logo motion keyframes. */
function buildSplashAnimationKeyframes(startScale, endScale, delta, fromOpacity, toOpacity) {
  return [
    { transform: `translate(-50%, -50%) scale(${startScale})`, opacity: fromOpacity },
    {
      transform: `translate(calc(-50% + ${delta.x}px), calc(-50% + ${delta.y}px)) scale(${endScale})`,
      opacity: toOpacity
    }
  ];
}

/** @returns {KeyframeAnimationOptions} Shared Figma-like timing. */
function getSplashAnimationOptions() {
  return { duration: 1000, delay: 500, easing: 'ease-in-out', fill: 'forwards' };
}

/** @returns {number} Scale matching the transient logo to final header height. */
function getSplashEndScale(splashLogo, endRect) {
  const baseHeight = splashLogo?.offsetHeight || 1;
  return endRect?.height > 0 ? endRect.height / baseHeight : 1;
}

/** @returns {number} Initial centered-logo scale. */
function getSplashStartScale(logoHeight) {
  const baseHeight = 100;
  return Math.max(1, (logoHeight ? 180 : baseHeight) / baseHeight);
}

/** @returns {number} Mobile-tuned centered-logo scale. */
function getResponsiveSplashStartScale(baseScale) {
  return isMobileSplash() ? Math.max(1, baseScale * 0.75) : baseScale;
}

/** Only explicit navigation flags skip animation; reloads animate again. */
function shouldSkipSplash() {
  return isLegacySkipSplashRequested();
}

/** @returns {boolean} Whether an explicit skip flag exists. */
function isLegacySkipSplashRequested() {
  return sessionStorage.getItem('skipSplash') === '1';
}

/** Clears the one-time navigation skip flag. */
function clearSkipSplash() {
  sessionStorage.removeItem('skipSplash');
}

/** Immediately shows the final page state. */
function showFinalSplashState({ splashLogo, splashLogoEnd, headerLogo, splashBg }) {
  hideElement(splashLogo);
  hideElement(splashLogoEnd);
  hideElement(splashBg);
  setHeaderLogoVisibility(headerLogo, true);
}

/** Finalizes an animation by revealing the real header logo. */
function finishSplashAnimation({ splashLogo, splashLogoEnd, headerLogo, splashBg }) {
  hideElement(splashBg);
  hideElement(splashLogo);
  hideElement(splashLogoEnd);
  setHeaderLogoVisibility(headerLogo, true);
}

/** @returns {Animation|null} Overlay fade animation. */
function fadeOutOverlay(splashBg, delay = 0, duration = 1000) {
  if (!splashBg) return null;
  return splashBg.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration, delay, fill: 'forwards'
  });
}

/** Finalizes after logo and overlay animations finish. */
function syncAnimationEnd(logoAnimations, overlayAnimation, elements) {
  const overlayFinished = overlayAnimation?.finished || Promise.resolve();
  const logoFinished = (logoAnimations || []).filter(Boolean).map(animation => animation.finished);
  Promise.all([...logoFinished, overlayFinished]).then(() => finishSplashAnimation(elements));
}

/** Hides an element after animation. */
function hideElement(element) {
  if (element) element.style.display = 'none';
}

/** Toggles visibility of the final header logo. */
function setHeaderLogoVisibility(headerLogo, isVisible) {
  if (headerLogo) headerLogo.style.opacity = isVisible ? '1' : '0';
}

document.addEventListener('DOMContentLoaded', runSplashAnimation);
