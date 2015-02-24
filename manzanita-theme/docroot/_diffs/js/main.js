AUI().ready(
	'liferay-sign-in-modal',
	'event-outside',
	'transition',
	function(A) {
		var signIn = A.one('#sign-in');

		if (signIn && signIn.getData('redirect') !== 'true') {
			signIn.plug(Liferay.SignInModal);
		}

		var Lang = A.Lang;

		BODY = A.getBody();

		var WIN = A.getWin();

		// Open search top

		searchIcon  = A.one('.open-search');
		rightIconGroup  = A.one('.right-icon-group');

		if (searchIcon) {
			searchIcon.on(
				'click',
				function() {
					if (!BODY.hasClass('opened-search')) {
						closingSearch = rightIconGroup.once(
							'clickoutside',
								function() {
									BODY.removeClass('opened-search');
								}
							)
					} else {
						closingSearch.detach();
					}

					BODY.toggleClass('opened-search');

					var openSearchInput = A.one('.portlet-search input[type="text"]');
					openSearchInput.focus();
				}
			);
		};

		// Open hamburguer menu

		var menuIcon = A.one('.menu-icon');

		if (menuIcon) {
			menuIcon.on(
				'click',
				function() {
					BODY.toggleClass('opened-menu-icon');
				}
			);
		}

		// Dockbar vertical JS, if dockbar is present

		var portletDockbar = A.one('#_145_dockbar');

		if (portletDockbar) {
			BODY.append('<div class="icon-toggle-dockbar vertical-dockbar-close"><i class="icon-cog"></i></div>');
			BODY.append('<div class="layer-mobile visible-phone vertical-dockbar-close"></div>');

			var toggleDockbar = A.one('.icon-toggle-dockbar');
			var toggleDockbarClose = A.all('.vertical-dockbar-close');
			var toggleDockbarIcon = A.one('.icon-toggle-dockbar .icon-cog');

			if (toggleDockbar) {
				toggleDockbarClose.on(
					'click',
					function() {
						portletDockbar.toggleClass('over');
						toggleDockbar.toggleClass('over');
						toggleDockbarIcon.toggleClass('icon-remove');
						toggleDockbarIcon.toggleClass('icon-cog');
						BODY.toggleClass('lfr-has-dockbar-vertical');
					}
				);
			}
		};
	}
);