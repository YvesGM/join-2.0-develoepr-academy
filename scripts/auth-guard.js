function getAuthGuardLoginPath() {
	return '../index.html';
}


function isFirebaseAuthAvailable() {
	return typeof firebase !== 'undefined' && typeof firebase.auth === 'function';
}


function isGuestSessionActive() {
	return sessionStorage.getItem('guestLogin') === '1' || localStorage.getItem('guestLogin') === '1';
}


function redirectToAuthGuardLogin() {
	window.location.href = getAuthGuardLoginPath();
}


function releaseAuthGuardVisibility() {
	document.documentElement.classList.remove('auth-check-pending');
}


/**
 * Resolves page access only after Firebase restored the persisted auth state.
 * Anonymous guest sessions therefore cannot race database reads after reload.
 * @param {firebase.User|null} user - Current Firebase Authentication user.
 */
function handleAuthGuardState(user) {
	if (user) {
		releaseAuthGuardVisibility();
		return;
	}
	redirectToAuthGuardLogin();
}


/**
 * Waits for Firebase Authentication before exposing protected pages.
 */
function enforceAuthGuard() {
	if (!isFirebaseAuthAvailable()) {
		redirectToAuthGuardLogin();
		return;
	}
	firebase.auth().onAuthStateChanged(handleAuthGuardState);
}


enforceAuthGuard();
