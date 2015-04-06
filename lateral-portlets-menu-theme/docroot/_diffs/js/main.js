AUI().ready(
	'anim',
	'liferay-navigation-interaction',
	'liferay-sign-in-modal',
	'transition',
	function(A) {
		var Lang = A.Lang;

		var BODY = A.getBody();

		var WIN = A.getWin();

		var navigationNode = A.one('#navigation');

		if (navigationNode) {
			navigationNode.plug(Liferay.NavigationInteraction);
		}

		var signIn = A.one('#sign-in');

		if (signIn && signIn.getData('redirect') !== 'true') {
			signIn.plug(Liferay.SignInModal);
		}

		// Adding dockbar-vertical, if dockbar portlet is present

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
		}

		// Creating portlets node list no navegate

		creationIndex = true;

		portletsIndex = A.one('.portletsIndex ul');

		// Node portlets on screen selector, to decide if create lateral index navigation
		var allPortletsNodes = A.all('#column-1>div>.portlet-boundary');
		var allPortletsNodesSize = allPortletsNodes.size();

		// Theme setting add class to show styles
		var lateralPortletsIndexPresent = A.one('.lateral-portlets-index');

		console.log('PORTLETS on screen: '+allPortletsNodesSize);

		// Create lateral portlets index

		var fullSizeNodesCalc = function () {
			winHeight = WIN.get('innerHeight');
			if (Lang.isUndefined(winHeight)) {
				winHeight = document.documentElement.clientHeight;
			}

			allPortletsNodes.each(
				function(node,i) {
					var thisNode = node;
					node.setStyle('minHeight', (winHeight));

					var gettitle = thisNode.one('.portlet-title-text');

					if (!gettitle) {
						var gettitle = thisNode.one('.portlet-title-default');

						if (gettitle) {
							var title = gettitle.text();
						} else {
							var title = "Title hide";
						};

					} else {
						var title = gettitle.text();
					};

					//console.log(title);

					if (creationIndex) {
						var nodeHeight = (100 / allPortletsNodesSize);
						node.prepend('<span id="portletIndexID'+i+'"></span>');
						portletsIndex.prepend('<li style="height:'+nodeHeight+'%"><a href="#portletIndexID'+i+'" class="scroll-animate portletIndex'+i+'">'+title+'</a></li>');
					};
				}
			);
		}

		// Find POV to mark portletIndex

		var findPOV = function () {
			var ScrollPos = (WIN.get('docScrollY'));
			allPortletsNodes.each(
				function(node,i) {
					var nodeHeight = (node.height());
					var nodePosition = (node.getY()-(nodeHeight/2));

					if (ScrollPos > nodePosition && ScrollPos < (nodePosition+nodeHeight)) {
						var numberSlideToGet = "portletIndex"+i;
						A.all('.portletsIndex li').removeClass('aactive');
						A.one('.portletsIndex .'+numberSlideToGet+'').ancestor().addClass('aactive');
					}
				}
			);
		}

		// Functions called on resize and scroll

		if (allPortletsNodesSize >= 2 && lateralPortletsIndexPresent) {
			BODY.addClass('lateral-portlets-index-ready');
			A.on('windowresize', fullSizeNodesCalc);
			fullSizeNodesCalc();
			creationIndex = false;

			A.on('scroll', findPOV);
            findPOV();
		}

		// Scroll animate to hash

		A.all('.scroll-animate').on(
			'click',
			function(animScroll) {
				var instance = this;

				var node = animScroll.currentTarget;
				var section = A.one(node.get('hash'));

				if (section) {
					var scrollTo = Lang.toInt(section.getY());
					animScroll.preventDefault();

					new A.Anim(
						{
							duration: 0.5,
							easing: 'easeBoth',
							node: 'win',
							to: {
								scroll: [0, scrollTo]
							}
						}
					).run();
				}
			}
		);
	}
);