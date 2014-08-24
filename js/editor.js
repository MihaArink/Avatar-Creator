jQuery(document).ready(function ($) {

	var SEL_AVATAR = ".avatars .avatar";
	var ASSET_DIR = "svg/";
	var $currentSelectedAvatar;
	var currentSelectedBodyPart;

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
	
	var selectBodyPart = function(id) {	
		deselectBodyPart(currentSelectedBodyPart);	
		highlightPath(id);
		currentSelectedBodyPart = id;
	};
	
	var deselectBodyPart = function(id) {
		if (id !== undefined) {
			deHighlightPath(id);
		}
	};
	
	$(".drawing").on("click", SEL_AVATAR, function(){
		selectAvatar($(this));
	});
	$(".drawing").on("click", "path", function(){
		selectBodyPart($(this).attr("data-id"));
	});
	
	var highlightPath = function(id) {
		$(".drawing-editor").find("[data-id=" + id + "]").addClass("hover");
	}
	
	var deHighlightPath = function(id) {
		$(".drawing-editor").find("[data-id=" + id + "]").removeClass("hover");
	}
	
	$(".drawing-editor").on("mouseover", "path", function() {
		highlightPath($(this).attr("data-id"));
	});
	$(".drawing-editor").on("mouseout", "path", function() {
		var id = $(this).attr("data-id");
		if (id == currentSelectedBodyPart) {
			return;
		}
		deHighlightPath(id);
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
				selectBodyPart($bodyPart.attr("data-id"));
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