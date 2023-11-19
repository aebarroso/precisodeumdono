function menuNav(menu) {
    document.location.href = String(menu).split("#")[1] + ".html";
}

$input = $('input[type="text"]');

$('.btn').on('click', function () {
    $val = $input.val();
    if ($(this).hasClass('btn-minuse')) {
        $input.val(parseInt($val) - 1);
        if (parseInt($val - 1) <= 0) {
            $input.val(0);
        }
    } else {
        $input.val(parseInt($val) + 1);
    }
});

