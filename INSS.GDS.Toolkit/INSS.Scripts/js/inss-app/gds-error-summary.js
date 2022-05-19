var InssAppErrorSummaryValidation = function () {
}

InssAppErrorSummaryValidation.prototype = {
    initialise: function () {
        this.formValidationSelectorClassName = 'form.inss-app-validation';
        this.fieldErrorClassName = 'field-validation-error';
        this.govukErrorMessageClassName = "govuk-error-message";
        this.govukGroupErrorClassName = 'govuk-form-group--error';
        this.govukGroupClassName = 'govuk-form-group';
        this.govukInputErrorClassName = 'govuk-input--error';
        this.govukTextAreaErrorClassName = 'govuk-textarea--error';
        this.inssAppHide = 'inss-app-hide';
        this.mainErrorSummaryId = 'inss-app-ErrorSummary';

        if ($(this.formValidationSelectorClassName).length > 0) {
            this.initialiseFieldValidationChangeCapture();
            this.initialiseValidationMessageChangeCapture();
            this.showErrorInPageTitle(this.mainErrorSummaryId);
        }
    },

    showErrorInPageTitle: function (errorSummaryId, setFocus) {
        var errorSummary = $('#' + errorSummaryId);
        var errorsVisible = this.anyVisibleErrorSummaryErrors(errorSummary);

        if (errorsVisible) {
            $(errorSummary).removeClass(this.inssAppHide);
            if (setFocus != undefined && setFocus) {
                $(errorSummary).focus();
            }
        } else {
            $(errorSummary).addClass(this.inssAppHide);
        }

        var errorStub = "Error: ";
        var titleBeginsWithError = document.title.indexOf(errorStub) === 0;
        if (titleBeginsWithError && !errorsVisible) {
            document.title = document.title.substring(errorStub.length);
        }
        else if (!titleBeginsWithError && errorsVisible) {
            document.title = errorStub + document.title;
        }
    },

    anyVisibleErrorSummaryErrors: function (errorSummary) {
        var allItems = $(errorSummary).find('LI');

        for (var i = 0; i < allItems.length; i++) {
            if ($(allItems[i]).text() != '') {
                return true;
            }
        }

        return false;
    },

    initialiseFieldValidationChangeCapture: function () {
        // override add/remove class to trigger a change event
        (function (func) {
            $.fn.addClass = function () {
                func.apply(this, arguments);
                this.trigger('classChanged');
                return this;
            }
        })($.fn.addClass); // pass the original function as an argument

        (function (func) {
            $.fn.removeClass = function () {
                func.apply(this, arguments);
                this.trigger('classChanged');
                return this;
            }
        })($.fn.removeClass);

        // trigger the add/remove class changes to add validation error class to the parent form group
        var formValidationSelectors = this.formValidationSelectorClassName + ' .' + this.govukErrorMessageClassName;
        var outerThis = this;

        $(formValidationSelectors).each(function () {
            outerThis.initialiseFieldErrorClassChangeCapture(this);
        });

        $(formValidationSelectors).on('classChanged', function () {
            outerThis.initialiseFieldErrorClassChangeCapture(this);
        });
    },

    initialiseValidationMessageChangeCapture: function () {
        var formValidationSelectors = this.formValidationSelectorClassName + ' .' + this.govukErrorMessageClassName;
        var outerThis = this;

        $(formValidationSelectors).each(function () {
            outerThis.initialiseValidationMessageChange(this);
        });
    },

    initialiseValidationMessageChange: function (validMsg) {
        var outerThis = this;

        var observer = new MutationObserver(function (records) {
            records.forEach(function (record) {
                outerThis.showErrorInPageTitle(outerThis.mainErrorSummaryId, false);
            });
        });

        observer.observe(validMsg, { childList: true, subtree: true });
    },

    initialiseFieldErrorClassChangeCapture: function (validMsg) {
        var formGroup = $(validMsg).closest('.' + this.govukGroupClassName);
        var inputElementId = '#' + $(validMsg).data('valmsg-for').replace('.', '_');
        var errorCount = formGroup.find('.' + this.fieldErrorClassName).length;

        if (errorCount > 0) {
            formGroup.addClass(this.govukGroupErrorClassName);
        } else {
            formGroup.removeClass(this.govukGroupErrorClassName);
        }

        var inputElement = formGroup.find(inputElementId);
        var inputElementClassName = this.getErrorClassForTag(inputElement.prop("tagName"));

        if (validMsg.classList.contains(this.fieldErrorClassName)) {
            inputElement.addClass(inputElementClassName);
        } else {
            inputElement.removeClass(inputElementClassName);
        }
    },

    getErrorClassForTag: function (tagName) {
        return tagName === 'TEXTAREA' ? this.govukTextAreaErrorClassName : this.govukInputErrorClassName;
    },
}

var inssAppErrorSummaryValidation = new InssAppErrorSummaryValidation();
inssAppErrorSummaryValidation.initialise();
