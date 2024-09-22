const imgs = $("article.article img");
const modal = $(".modal, .modal-image, .modal-bg");
const modal_img = $(".modal-image");
imgs.each((index, img) => {
    if ($(img).parent().prop("class") === "scrollspy-backtotop") return;
    $(img).on("click", () => {
        modal.fadeIn("fast");
        modal_img.prop("src", $(img).prop("src"));
    });
});
modal.on("click", () => {
    modal.fadeOut("fast");
});