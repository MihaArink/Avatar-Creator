jQuery(document).ready(function ($) {

	var SEL_AVATAR = ".avatars .avatar";
	var ASSET_DIR = "svg/";
	var $currentSelectedAvatar;
	var $currentSelectedBodyPart;

	var avatars= [
	{
		head: "#815727",
		torso: "#D68D00",
		legs: "#815727",
		name: "pindachocola",
		filename: "person.svg"
    },
	{
		head: "#FF85FF",
		torso: "#FF8AD8",
		legs: "#FECFE6",
		name: "marshmallow",
		filename: "person.svg"
    },
    {
		head: "#000000",
		torso: "#FF424A",
		legs: "#01702F",
		name: "watermeloen",
		filename: "person.svg"
    },
    {
		head: "#011993",
		torso: "#C6FEFB",
		legs: "#72B2FF",
		name: "wolkenscheetje",
		filename: "person.svg"
    }
	];
	
	var selectAvatar = function($avatar) {
		deselectAvatar($currentSelectedAvatar);
		$avatar.addClass("avatar-selected");
		$currentSelectedAvatar= $avatar;
		$('.avatar-big').html("");
		drawAvatar($avatar.data("avatar"), $('.avatar-big'), "big");
	};
	
	var deselectAvatar = function($avatar) {
		if($avatar !== undefined) {
			$avatar.removeClass("avatar-selected");
		}
	};
	
	var selectBodyPart = function($bodyPart) {	
		deselectBodyPart($currentSelectedBodyPart);	
		//svgAddClass($bodyPart, "bodypart-selected");
		highlightPath($bodyPart);
		$currentSelectedBodyPart = $bodyPart;
	};
	
	var deselectBodyPart = function($bodyPart) {
		if ($bodyPart !== undefined) {
			//svgRemoveClass($bodyPart, "bodypart-selected");
			deHighlightPath($bodyPart);
		}
	};
	
	var svgAddClass = function($path, className) {
		$path.attr('class', function(index, classNames) {
			return classNames + " " + className;
		});
	};
	
	var svgRemoveClass = function($path, className) {
		$path.attr('class', function(index, classNames) {
			return classNames.replace(className, '');
		});
	};
	
	$(".drawing").on("click", SEL_AVATAR, function(){
		selectAvatar($(this));
	});
	$(".drawing").on("click", "path", function(){
		selectBodyPart($(this));
	});
	
	var highlightPath = function($path) {
		var id= $path.attr('data-id');
		$path.closest(".avatar").find("[data-id=" + id + "]").addClass("hover");
	}
	
	var deHighlightPath = function($path) {
		var id = $path.attr('data-id');
		$path.closest(".avatar").find("[data-id=" + id + "]").removeClass("hover");
	}
	
	$(".drawing").on("mouseover", "path", function() {
		highlightPath($(this));
	});
	$(".drawing").on("mouseout", "path", function() {
		var $path = $(this);
		if ($path.attr("data-id") == $currentSelectedBodyPart.attr("data-id")) {
			return;
		}
		deHighlightPath($path);
	});
	var template = $("#avatar").text();
	
	var drawAvatar= function(avatarData, $container, mode) {
		var $avatar = $(template);
		$avatar.data("avatar", avatarData);
		$avatar.find(".img").load(ASSET_DIR+avatarData.filename, undefined, function() {
			var $bodyPart = $avatar.find("path.head")
			$bodyPart.attr("fill", avatarData.head);
			$avatar.find("path.torso").attr("fill", avatarData.torso);
			$avatar.find("path.legs").attr("fill", avatarData.legs);
			if (mode === "big") {
				var $highlight = $('<div class="highlight"></div>');
				$highlight.appendTo($(this).closest(".avatar"));
				$(this).find("svg").clone().appendTo($highlight);
				selectBodyPart($bodyPart);
			}
		});
		$avatar.find("p").text(avatarData.name);
		$container.append($avatar);
	}
	
	for (var i=0; i<avatars.length; i++) {
		drawAvatar(avatars[i], $(".avatars"))
	}
	
	selectAvatar($(SEL_AVATAR).first());
});
// DO NOT ADD CODE HERE