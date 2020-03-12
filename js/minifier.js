(function minifyCSS() {
    $('#minify-btn').on('click', () => {
        const firstInput = $('#input-textarea').val()
        const input = firstInput.replace(/[\n\r\t\v\f]{1,}(?![^\(\]]*\))| {2,}/g, '') // .replace(/\s/g, '');
      //  const regexPropFix = /\s(?![^\(\]]*\))/g;
        const removedComments = removeComments(input);
        const removedSemiColons = removeLastSemicolon(removedComments);
        const minifiedCSS = removeWhiteSpaceBeforeCurlyBrace(removedSemiColons);
        $('#minified').val(minifiedCSS);
        console.log(firstInput);
        localStorage.setItem('min-css', firstInput);
    });
}());

(function revertChanges() {
    $('#revert-btn').on('click', () => {
        $('#minified').val(localStorage.getItem('min-css'));
    });
}());

(function addClearEvents() {
    $('body > div > div.row.justify-content-around > div.input > div.row.justify-content-center.mt-2 > button:nth-child(2)').on('click', () => {
        $('#input-textarea').val('');
    });

    $('body > div > div.row.justify-content-around > div.minified-textarea > div.row.justify-content-center.mt-2 > button:nth-child(3)').on('click', () => {
        $('#minified').val('');
    })
}());

(function copyMinifiedToClipBoardEvent() {
    $('#copy-btn').on('click', () => {
        copyMinifedToClipBoard();
    });
}());

function copyMinifedToClipBoard() {
    const copyText = document.getElementById("minified");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    notification("Text copied to clipboard", "success");
};

function removeComments(str) {
    let result = '';
    result = str.replace(/(\/\*)+?(.+?)+?(\*\/)+?/gms, '')
    return result;
}

function removeLastSemicolon(str) {
    let result = '';
    for (let i = 0; i < str.length - 1; i += 1) {
        let currEl = str[i];
        let nextEl = str[i + 1];
        if (currEl == ';') {
            if (nextEl == '}') {
                currEl = '';
            }
        }
        result += currEl
    }
    result += str[str.length - 1]
    return result;
}

function removeWhiteSpaceBeforeCurlyBrace(str) {
    let result = '';
    for (let i = 0; i < str.length - 1; i += 1) {
        let currEl = str[i];
        let nextEl = str[i + 1];
        if (currEl == ' ') {
            if (nextEl == '{') {
                currEl = '';
            }
        }
        result += currEl
    }
    result += str[str.length - 1]
    return result;
}

function notification(msg, type) {
    toastr.clear();
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    if (type == 'error') {
        toastr.error(msg);
    } else if (type == 'success') {
        toastr.success(msg);
    } else if (type == 'loading') {
        toastr.info(msg);
    }
};