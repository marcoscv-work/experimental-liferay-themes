AUI().ready(
	'liferay-sign-in-modal',
	function(A) {
		var Lang = A.Lang;

		var BODY = A.getBody();

		var WIN = A.getWin();

		var navigation = A.one('#navigation');

		if (navigation) {
			navigation.plug(Liferay.NavigationInteraction);
		}

		var signIn = A.one('.sign-in');

		if (signIn && signIn.getData('redirect') !== 'true') {
			signIn.plug(Liferay.SignInModal);
		}

		A.one('.navigation-menu').on(
			'click',
			function() {
				BODY.toggleClass('opened');
			}
		);

		A.one('.back-nav').on(
			'click',
			function() {
				BODY.toggleClass('opened');
			}
		);
	}
);