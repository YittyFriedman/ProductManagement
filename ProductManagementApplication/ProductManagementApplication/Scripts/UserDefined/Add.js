
$(document).ready(function () {
    $(document).delegate("ul.dropdown-menu [data-keepOpenOnClick]", "click", function (e) {
        e.stopPropagation();
    });
    window.userId = $("#spnUserId").text();
    $("#btnRefactorAMItem").hide();
    window.productList;

    INIT.GetRefactorPermissions();

    INIT.LoadSuppliers();
    window.supplierDescription = "";
    window.supplierId = 0;

    INIT.LoadBrands();
    window.brandList = [];
    window.brandDescription = "";
    window.brandId = 0;

    window.vendorList = [];
    window.vendorId = 0;
    window.vendorCode = "";
    INIT.LoadVendors();

    INIT.LoadClasses();
    window.classDescription1 = "";
    window.classId1 = 0;

    window.classDescription2 = "";
    window.classId2 = 0;

    window.classDescription3 = "";
    window.classId3 = 0;

    INIT.LoadTypes();
    window.typeDescription = "";
    window.typeId = "";

    INIT.LoadColors();
    window.colorOptionsCount = 0;
    window.colorOptions = [];

    INIT.LoadSizes();

    window.sizeOptionsCount = 0;
    window.sizeOptions = [];

    INIT.LoadSizeTitles();
    window.sizeTitleDescription = "";
    window.sizeTitleId = 0;

    INIT.LoadOrientations();
    window.orientationOptionsCount = 0;
    window.orientationOptions = [];

    INIT.LoadFlavors();
    window.flavorOptionsCount = 0;
    window.flavorOptions = [];

    INIT.LoadPackagings();
    window.packagingOptionsCount = 0;
    window.packagingOptions = [];

    INIT.LoadUOMs();
    window.uomOptionsCount = 0;
    window.uomOptions = [];

    INIT.LoadStrengths();
    window.strengthOptionsCount = 0;
    window.strengthOptions = [];

    INIT.LoadGenders();
    window.genderOptionsCount = 0;
    window.genderOptions = [];

    INIT.LoadOthers();
    window.otherOptionsCount = 0;
    window.otherOptions = [];


    INIT.LoadUOMCategories();
    window.uomCategories = [];

    window.uomBases = [];
    window.firstPickUOM = true;

    window.amProductList = [];
    window.siblingItemList = [];
    window.parentAMItem;
    window.newProductList = [];
    //$(document).on('click', ".ddCkBx", function () {

    //    //var isChecked = $(this).find("input[type='checkbox']").is(':checked');
    //   // if (isChecked) {
    //        $(this).find("span").trigger("click");
    //    //}
    //    //else {
    //    //    $(this).find("input[type='checkbox']").prop('checked', true).trigger("change");

    //    //}

    //});

    $(document).on('click', "#btnRefactorAMItem", function () {
        $("#idAMItemModal").modal("toggle");
        if ($(this).text() == "Refactor AM Product") {



            $("#txtModelAMProduct").val("");
            window.siblingItemList = [];
            $(".btnLookupExAMItem").attr("data-modalscreenno", "1");
            $(".btnRefactorBack").attr("data-modalscreenno", "1");
            $("#spnItemNotFound").hide();
            $("#divScreen1").show();
            $("#divScreen2").hide();
            $("#divScreen3").hide();
            $("#ulSelectedItemList").empty();
            $("#btnRefactorBack").text("Close");
            $("#btnLookupExAMItem").text("Next");
        }
        else {
            $("#btnRefactorBack").text("Back");
            $("#btnLookupExAMItem").text("Save");
            $(".btnRefactorBack").attr("data-modalscreenno", "3");
            $(".btnLookupExAMItem").attr("data-modalscreenno", "3");
            $("#divScreen1").hide();
            $("#divScreen2").hide();
            $("#divScreen3").show();
        }
    });

    $(document).on('click', ".btnLookupExAMItem", function () {
        var screen = this.dataset.modalscreenno;
        if (screen == "1") {
            var amItemNo = $("#txtModelAMProduct").val();
            window.additionalItemNo = amItemNo;
            INIT.FindAMItem(this, amItemNo);
            $("#btnRefactorBack").text("Back");
            $("#ulSelectedItemList").empty();
            window.siblingItemList = [];
            $("#btnRefactorAMItem").text("Refactor AM Product");
        }
        if (screen == "2") {
            $("#ulSelectedItemList").empty();
            window.siblingItemList = [];

            var selectedItem = new Object();
            selectedItem.selectedItemNo = window.additionalItemNo;
            selectedItem.selectedItemDesc = window.additionalItemDesc;

            window.siblingItemList.push(selectedItem);
            $(".ckAddSibling:checkbox:checked").each(function () {
                var selectedItemNo = $(this).parents('tr').find(".spnSiblingItemNo").text();
                var selectedItemDesc = $(this).parents('tr').find(".spnSiblingItemDesc").text();

                var selectedItem = new Object();
                selectedItem.selectedItemNo = selectedItemNo;
                selectedItem.selectedItemDesc = selectedItemDesc;
                window.siblingItemList.push(selectedItem);
            });
            $("#divScreen2").hide();
            $("#divScreen3").show();
            $("#btnLookupExAMItem").text("Save");
            this.dataset.modalscreenno = "3";
            $(".btnRefactorBack").attr("data-modalscreenno", "3");
            for (var i = 0; i < window.siblingItemList.length; i++) {
                $("#ulSelectedItemList").append('<li>' + window.siblingItemList[i].selectedItemNo + ": " + window.siblingItemList[i].selectedItemDesc + '</li>');
            }
        }
        if (screen == "3") {
            $("#idAMItemModal").modal("toggle");
            $("#btnRefactorAMItem").text(window.siblingItemList.length + " Item(s) Selected");
        }
    });

    $(document).on('click', "#btnRefactorBack", function () {
        if ($(this).text() == "Close") {
            $("#idAMItemModal").modal("toggle");

        }
        if (this.dataset.modalscreenno == "2") {
            $(".btnRefactorBack").attr("data-modalscreenno", "1");
            $(".btnLookupExAMItem").attr("data-modalscreenno", "1");
            $("#btnRefactorBack").text("Close");
            $("#divScreen1").show();
            $("#divScreen2").hide();
            $("#divScreen3").hide();
        }
        if (this.dataset.modalscreenno == "3") {
            $(".btnRefactorBack").attr("data-modalscreenno", "2");
            $(".btnLookupExAMItem").attr("data-modalscreenno", "2");
            $("#divScreen1").hide();
            $("#divScreen2").show();
            $("#divScreen3").hide();
            $("#btnLookupExAMItem").text("Next");
        }
    });

    $(document).on('click', "#btnAddSibling", function () {
        Shared.AddEditRow();
        Shared.ScrollSmoothToTop("divSiblingTblContainer");
    });

    $(document).on('click', "#btnAddAddtnlSibling", function () {
        var itemNo = $(this).parents(".trEditRow").find("#txtAdditionalSibling").val();
        INIT.FindAddtAMItem(this, itemNo);
    });
    $(document).on('click', "#btnCancelSibling", function () {
        $(this).parents(".trEditRow").empty();
    });

    //supplier
    $(document).on('click', ".ckSupplier", function () {
        var checked = this.dataset.ischecked;// $(this).is(':checked');
        var supplierId = this.dataset.id;
        var supplierDesc = this.dataset.value;
        $(".ckSupplier").each(function () {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
        });

        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.supplierId = supplierId;
            window.supplierDescription = supplierDesc;
            $("#lblSupplier").text(window.supplierDescription);

        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            $("#lblSupplier").text("Select one");
            window.supplierId = 0;
            window.supplierDescription = "";
        }
    });

    $(document).on('click', "#btnAddSupplier", function () {
        $("#spnModalTitle").text("Manufacturer");
        $("#lblModelName").text("Manufacturer Name:");
        $("#divModelCode").hide();
        $(".saveAddNew").prop('id', 'btnSaveNewSupplier');
    });

    $(document).on('click', "#btnSaveNewSupplier", function () {
        var newSupplierName = $("#txtModelName").val();
        if (newSupplierName != "") {
            SAVE.SaveSupplierName(newSupplierName);
        }
        else {
            alert("Please enter a valid Manufacturer Name");
        }
    });
    $("#txtBrand").autocomplete({
        minLength: 0,
        autoFocus: true,

        source: function (request, response) {
            window.brandDescription = "";
            window.brandId = 0;
            response($.map(window.brandList, function (obj, key) {

                var BrandDescription = obj.BrandDescription.toUpperCase();

                if (BrandDescription.indexOf(request.term.toUpperCase()) != -1) {
                    return {
                        label: obj.BrandDescription, // Label for Display
                        value: obj.BrandDescription,
                        data: obj.BrandId, // Value
                    }
                } else {
                    return null;
                }
            }));
        },



        select: function (event, ui) {
            event.preventDefault();
            $('#txtBrand').val(ui.item.label);
            window.brandDescription = ui.item.label;
            window.brandId = ui.item.data;
            // ... any other tasks (like setting Hidden Fields) go here...
        }
    }).focus(function () {
        $(this).autocomplete("search", "");
    });
    //class
    //$(document).on('click', ".ckClass", function () {
    //    var checked = $(this).is(':checked');
    //    var classId = this.dataset.id;
    //    var classDesc = $(this).val();
    //    $(".ckClass").prop("checked", false);

    //    if (checked) {
    //        $(this).prop("checked", true);
    //        window.classId = classId;
    //        window.classDescription = classDesc;
    //        $("#lblClass").text(window.classDescription);

    //    }
    //    else {
    //        $("#lblClass").text("Select one");
    //        window.classId = 0;
    //        window.classDescription = "";
    //    }

    //});

    $(document).on('click', ".liClass1", function () {

        var checked = this.dataset.ischecked;
        var revNo = this.dataset.revno;
        var classDesc = $(this).text();
        classDesc = classDesc.substring(5);
        $("#ddmClass1").find(".spnCheck").hide();
        $("#ddmClass1").find(".spnSpc").show();
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.classId1 = revNo;
            window.classDescription1 = classDesc;
            $("#lblClass1").text(window.classDescription1);



        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.classId1 = "0";
            window.classDescription1 = "";

            $("#lblClass1").text("Select one");

        }

    });

    $(document).on('click', ".liClass2", function () {

        var checked = this.dataset.ischecked;
        var revNo = this.dataset.revno;
        var classDesc = $(this).text();
        classDesc = classDesc.substring(5);
        $("#ddmClass2").find(".spnCheck").hide();
        $("#ddmClass2").find(".spnSpc").show();
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.classId2 = revNo;
            window.classDescription2 = classDesc;
            $("#lblClass2").text(window.classDescription2);



        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.classId2 = "0";
            window.classDescription2 = "";

            $("#lblClass2").text("Select one");

        }

    });

    $(document).on('click', ".liClass3", function () {
        var checked = this.dataset.ischecked;
        var revNo = this.dataset.revno;
        var classDesc = $(this).text();
        classDesc = classDesc.substring(5);
        $("#ddmClass3").find(".spnCheck").hide();
        $("#ddmClass3").find(".spnSpc").show();
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.classId3 = revNo;
            window.classDescription3 = classDesc;
            $("#lblClass3").text(window.classDescription3);



        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.classId3 = "0";
            window.classDescription3 = "";

            $("#lblClass3").text("Select one");

        }


    });

    //$(document).on('click', "#btnAddClass", function () {
    //    $("#spnModalTitle").text("Class");
    //    $("#lblModelName").text("Class Name:");
    //    $("#lblModelCode").text("Class Code:");
    //    $(".saveAddNew").prop('id', 'btnSaveNewClass');
    //});

    //$(document).on('click', "#btnSaveNewClass", function () {
    //    var newClassName = $("#txtModelName").val();
    //    var newClassCode = $("#txtModelCode").val();
    //    if (newClassCode.length == 3) {
    //        if (newClassName != "" && newClassCode != "") {
    //            SAVE.SaveClassName(newClassName, newClassCode);
    //        }
    //        else {
    //            alert("Please enter a valid Class Name and Class Code");
    //        }
    //    } else {
    //        alert("Please enter a valid 3 character Class Code");
    //    }
    //});

    $(document).on('click', ".dropdown-submenu a.test", function (e) {
        /* This is to hide all dropdown-menu children if the parent(dropdown-submenu) in the element have been clicked */
        $(this).next('ul').find('.dropdown-menu').each(function () {
            $(this).hide();
        });

        /* This is to find another dropdown-menu have has been opened and hide its submenu */
        var xw = $(this);
        $(this).closest(".dropdown-menu").find('.dropdown-submenu a.test').not(xw).each(function () {
            if ($(this).next("ul").is(":visible")) {
                $(this).next("ul").hide();
            }
        });
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
    //$(document).on('click', "#ddmBtnClass", function (e) {

    //    $(this).find('ul').find('.dropdown-menu').each(function () {
    //        $(this).hide();
    //    });
    //});
    //type
    $(document).on('click', ".ckType", function () {
        var checked = this.dataset.ischecked;
        var typeId = this.dataset.id;
        var typeDesc = this.dataset.value;
        $(".ckType").each(function () {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
        });

        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.typeId = typeId;
            window.typeDescription = typeDesc;
            $("#lblType").text(window.typeDescription);

        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            $("#lblType").text("Select one");
            window.typeId = "";
            window.typeDescription = "";
        }

    });


    //vendor
    $("#txtVendorId").each(function () {
        $(this).autocomplete({
            minLength: 0,
            autoFocus: true,

            source: function (request, response) {
                //window.vendorCode = "";
                //                       window.ven = 0;
                response($.map(window.vendorList, function (obj, key) {

                    var VendorNo = obj.VendorNo.toUpperCase();

                    if (VendorNo.indexOf(request.term.toUpperCase()) != -1) {
                        return {
                            label: obj.VendorNo, // Label for Display
                            value: obj.VendorNo,
                            data: obj.VendorId, // Value

                        }
                    } else {
                        return null;
                    }

                }));

            },

            change: function (event, ui) {
                if (ui.item == null)
                    this.dataset.vendorid = "0";
                else
                    this.dataset.vendorid = ui.item.data;
            },

            select: function (event, ui) {
                event.preventDefault();
                $(this).val(ui.item.label);
                this.dataset.vendorid = ui.item.data;
                // window.brandDescription = ui.item.label;
                // window.brandId = ui.item.data;
                // ... any other tasks (like setting Hidden Fields) go here...
            }
        }).focus(function () {
            $(this).autocomplete("search", "");
        });
    });

    //color
    $(document).on('click', "#ckChooseColor", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseColor").show();
            $("#lblColorLabel").addClass("required");
        }
        else {
            $("#divChooseColor").hide();
            $("#lblColorLabel").removeClass("required");
            $(".ckColor").prop("checked", false);
            window.colorOptionsCount = 0;
            window.colorOptions = [];
            $("#lblColor").text("Select Available Colors");
        }
    });

    $(document).on('click', ".ckColor", function () {
        var checked = this.dataset.ischecked;
        var colorId = this.dataset.id;

        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.colorOptionsCount++;
            $("#lblColor").text(window.colorOptionsCount + " selected");
            window.colorOptions.push(colorId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.colorOptionsCount--;
            const index = window.colorOptions.indexOf(colorId);
            if (index > -1) {
                window.colorOptions.splice(index, 1);
            }
            if (window.colorOptionsCount < 1) {
                $("#lblColor").text("Select Available Colors");
            }
            else { $("#lblColor").text(window.colorOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddColor", function () {
        $("#spnModalTitle").text("Color");
        $("#lblModelName").text("Color Name:");
        $("#lblModelCode").text("Color Code:");
        $(".saveAddNew").prop('id', 'btnSaveNewColor');
    });

    $(document).on('click', "#btnSaveNewColor", function () {
        var newColorName = $("#txtModelName").val();
        var newColorCode = $("#txtModelCode").val();
        if (newColorCode.length == 3) {
            if (newColorName != "" && newColorCode != "") {
                SAVE.SaveColorName(newColorName, newColorCode);
            }
            else {
                alert("Please enter a valid Color Name and Color Code");
            }
        }
        else {
            alert("Please enter a valid 3 character Color Code");
        }
    });


    //size
    $(document).on('click', "#ckChooseSize", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseSize").show();
            $("#lblSizeLabel").addClass("required");
        }
        else {
            $("#divChooseSize").hide();
            $("#lblSizeLabel").removeClass("required");
            $(".ckSize").prop("checked", false);
            window.sizeOptionsCount = 0;
            window.sizeOptions = [];
            $("#lblSize").text("Select Available Sizes");

        }
    });

    $(document).on('click', ".ckSize", function () {
        var checked = this.dataset.ischecked;
        var sizeId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.sizeOptionsCount++;
            $("#lblSize").text(window.sizeOptionsCount + " selected");
            window.sizeOptions.push(sizeId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.sizeOptionsCount--;
            const index = window.sizeOptions.indexOf(sizeId);
            if (index > -1) {
                window.sizeOptions.splice(index, 1);
            }
            if (window.sizeOptionsCount < 1) {
                $("#lblSize").text("Select Available Sizes");
            }
            else { $("#lblSize").text(window.sizeOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddSize", function () {
        $("#spnModalTitle").text("Size");
        $("#lblModelName").text("Size Name:");
        $("#lblModelCode").text("Size Code:");
        $("#lblModelTitle").text("Size Title:");
        $("#divModelTitle").show();

        $(".saveAddNew").prop('id', 'btnSaveNewSize');
    });

    $(document).on('click', "#btnSaveNewSize", function () {
        var newSizeName = $("#txtModelName").val();
        var newSizeCode = $("#txtModelCode").val();
        var newSizeTitleId = window.sizeTitleId;
        if (newSizeCode.length == 3) {
            if (newSizeName != "" && newSizeCode != "" && newSizeTitleId != 0) {
                SAVE.SaveSizeName(newSizeName, newSizeCode, newSizeTitleId);
            }
            else {
                alert("Please enter a valid Size Name, Code and Title");
            }
        }
        else {
            alert("Please enter a valid 3 character Size Code");
        }
    });

    $(document).on('click', ".ckSizeTitle", function () {
        window.sizeTitleId = 0;
        window.sizeTitleDescription = "";
        var checked = this.dataset.ischecked;
        var titleId = this.dataset.id;
        var titleDesc = this.dataset.value;
        $(".ckSizeTitle").each(function () {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
        });


        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.sizeTitleId = titleId;
            window.sizeTitleDescription = titleDesc;
            $("#lblTitle").text(window.sizeTitleDescription);

        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            $("#lblTitle").text("Select one");
            window.sizeTitleId = 0;
            window.sizeTitleDescription = "";
        }
    });

    //orientation
    $(document).on('click', "#ckChooseOrientation", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseOrientation").show();
            $("#lblOrientationLabel").addClass("required");
        }
        else {
            $("#divChooseOrientation").hide();
            $("#lblOrientationLabel").removeClass("required");
            $(".ckOrientation").prop("checked", false);
            window.orientationOptionsCount = 0;
            window.orientationOptions = [];
            $("#lblOrientation").text("Select Available Orientations");
        }
    });

    $(document).on('click', ".ckOrientation", function () {
        var checked = this.dataset.ischecked;
        var orientationId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.orientationOptionsCount++;
            $("#lblOrientation").text(window.orientationOptionsCount + " selected");
            window.orientationOptions.push(orientationId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.orientationOptionsCount--;
            const index = window.orientationOptions.indexOf(orientationId);
            if (index > -1) {
                window.orientationOptions.splice(index, 1);
            }
            if (window.orientationOptionsCount < 1) {
                $("#lblOrientation").text("Select Available Orientations");
            }
            else { $("#lblOrientation").text(window.orientationOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddOrientation", function () {
        $("#spnModalTitle").text("Orientation");
        $("#lblModelName").text("Orientation Name:");
        $("#lblModelCode").text("Orientation Code:");
        $(".saveAddNew").prop('id', 'btnSaveNewOrientation');
    });

    $(document).on('click', "#btnSaveNewOrientation", function () {
        var newOrientationName = $("#txtModelName").val();
        var newOrientationCode = $("#txtModelCode").val();
        if (newOrientationCode.length == 3) {
            if (newOrientationName != "" && newOrientationCode != "") {
                SAVE.SaveOrientationName(newOrientationName, newOrientationCode);
            }
            else {
                alert("Please enter a valid Orientation Name and Orientation Code");
            }
        } else {
            alert("Please enter a valid 3 character Orientation Code");
        }
    });

    //flavor
    $(document).on('click', "#ckChooseFlavor", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseFlavor").show();
            $("#lblFlavorLabel").addClass("required");
        }
        else {
            $("#divChooseFlavor").hide();
            $("#lblFlavorLabel").removeClass("required");
            $(".ckFlavor").prop("checked", false);
            window.flavorOptionsCount = 0;
            window.flavorOptions = [];
            $("#lblFlavor").text("Select Available Flavors");
        }
    });

    $(document).on('click', ".ckFlavor", function () {
        var checked = this.dataset.ischecked;
        var flavorId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.flavorOptionsCount++;
            $("#lblFlavor").text(window.flavorOptionsCount + " selected");
            window.flavorOptions.push(flavorId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.flavorOptionsCount--;
            const index = window.flavorOptions.indexOf(flavorId);
            if (index > -1) {
                window.flavorOptions.splice(index, 1);
            }
            if (window.flavorOptionsCount < 1) {
                $("#lblFlavor").text("Select Available Flavors");
            }
            else { $("#lblFlavor").text(window.flavorOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddFlavor", function () {
        $("#spnModalTitle").text("Flavor");
        $("#lblModelName").text("Flavor Name:");
        $("#lblModelCode").text("Flavor Code:");
        $(".saveAddNew").prop('id', 'btnSaveNewFlavor');
    });

    $(document).on('click', "#btnSaveNewFlavor", function () {
        var newFlavorName = $("#txtModelName").val();
        var newFlavorCode = $("#txtModelCode").val();
        if (newFlavorCode.length == 3) {
            if (newFlavorName != "" && newFlavorCode != "") {
                SAVE.SaveFlavorName(newFlavorName, newFlavorCode);
            }
            else {
                alert("Please enter a valid Flavor Name and Flavor Code");
            }
        } else {
            alert("Please enter a valid 3 character Flavor Code");
        }
    });

    //packaging
    $(document).on('click', "#ckChoosePackaging", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChoosePackaging").show();
            $("#lblPackagingLabel").addClass("required");
        }
        else {
            $("#divChoosePackaging").hide();
            $("#lblPackagingLabel").removeClass("required");
            $(".ckPackaging").prop("checked", false);
            window.packagingOptionsCount = 0;
            window.packagingOptions = [];
            $("#lblPackaging").text("Select Available Packagings");
        }
    });

    $(document).on('click', ".ckPackaging", function () {
        var checked = this.dataset.ischecked;
        var packagingId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.packagingOptionsCount++;
            $("#lblPackaging").text(window.packagingOptionsCount + " selected");
            window.packagingOptions.push(packagingId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.packagingOptionsCount--;
            const index = window.packagingOptions.indexOf(packagingId);
            if (index > -1) {
                window.packagingOptions.splice(index, 1);
            }
            if (window.packagingOptionsCount < 1) {
                $("#lblPackaging").text("Select Available Packagings");
            }
            else { $("#lblPackaging").text(window.packagingOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddPackaging", function () {
        $("#spnModalTitle").text("Packaging");
        $("#lblModelName").text("Packaging Name:");
        $("#lblModelCode").text("Packaging Code:");
        $(".saveAddNew").prop('id', 'btnSaveNewPackaging');
    });

    $(document).on('click', "#btnSaveNewPackaging", function () {
        var newPackagingName = $("#txtModelName").val();
        var newPackagingCode = $("#txtModelCode").val();
        if (newPackagingCode.length == 3) {
            if (newPackagingName != "" && newPackagingCode != "") {
                SAVE.SavePackagingName(newPackagingName, newPackagingCode);
            }
            else {
                alert("Please enter a valid Packaging Name and Packaging Code");
            }
        } else {
            alert("Please enter a valid 3 character Packaging Code");
        }
    });

    //uom
    $(document).on('click', "#ckChooseUOM", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseUOM").show();
            $("#lblUOMLabel").addClass("required");
        }
        else {
            $("#divChooseUOM").hide();
            $("#lblUOMLabel").removeClass("required");
            $(".ckUOM").prop("checked", false);
            window.uomOptionsCount = 0;
            window.uomOptions = [];
            $("#lblUOM").text("Select Available UOMs");
        }
    });

    $(document).on('click', ".ckUOM", function () {
        var checked = this.dataset.ischecked;
        var uomId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.uomOptionsCount++;
            $("#lblUOM").text(window.uomOptionsCount + " selected");
            window.uomOptions.push(uomId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.uomOptionsCount--;
            const index = window.uomOptions.indexOf(uomId);
            if (index > -1) {
                window.uomOptions.splice(index, 1);
            }
            if (window.uomOptionsCount < 1) {
                $("#lblUOM").text("Select Available UOMs");
            }
            else { $("#lblUOM").text(window.uomOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddUOM", function () {
        $("#divModelName").hide();
        $("#divModelNameUOM").show();
        $("#spnModalTitle").text("UOM");
        //$("#lblModelName").text("UOM Name:");
        $("#lblModelCode").text("UOM Code:");
        $("#txtModalUOM").val("");
        $("#spnModalUOMSelected").html('<span class="caret"></span>');
        // $("#txtModelCode").val();
        $("#txtModelCode").attr('maxlength', '4');
        $("#txtModelCode").attr('placeholder', 'Enter 2-4 Digit Code');
        $(".saveAddNew").prop('id', 'btnSaveNewUOM');
        INIT.LoadUOMBases();
    });

    $(document).on('click', "#btnSaveNewUOM", function () {
        $("#txtModelCode").attr('maxlength', '3');
        $("#txtModelCode").attr('placeholder', 'Enter 3 Digit Code');
        var newUOMFactor = $("#txtModalUOM").val();
        var newUOMBase = $("#spnModalUOMSelected").text();
        var newUOMCode = $("#txtModelCode").val();
        if (newUOMCode.length > 2 && newUOMCode.length < 5) {
            if (newUOMFactor != "" && newUOMBase != "" && newUOMCode != "") {
                SAVE.SaveUOMName(newUOMFactor, newUOMBase, newUOMCode);
            }
            else {
                alert("Please enter a valid UOM Base, Factor and Code");
            }
        } else {
            alert("Please enter a valid 2-4 character UOM Code");
        }
    });

    //strength
    $(document).on('click', "#ckChooseStrength", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseStrength").show();
            $("#lblStrengthLabel").addClass("required");
        }
        else {
            $("#divChooseStrength").hide();
            $("#lblStrengthLabel").removeClass("required");
            $(".ckStrength").prop("checked", false);
            window.strengthOptionsCount = 0;
            window.strengthOptions = [];
            $("#lblStrength").text("Select Available Strengths");
        }
    });

    $(document).on('click', ".ckStrength", function () {
        var checked = this.dataset.ischecked;
        var strengthId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.strengthOptionsCount++;
            $("#lblStrength").text(window.strengthOptionsCount + " selected");
            window.strengthOptions.push(strengthId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.strengthOptionsCount--;
            const index = window.strengthOptions.indexOf(strengthId);
            if (index > -1) {
                window.strengthOptions.splice(index, 1);
            }
            if (window.strengthOptionsCount < 1) {
                $("#lblStrength").text("Select Available Strengths");
            }
            else { $("#lblStrength").text(window.strengthOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddStrength", function () {
        $("#spnModalTitle").text("Strength");
        $("#lblModelName").text("Strength Name:");
        $("#lblModelCode").text("Strength Code:");
        $(".saveAddNew").prop('id', 'btnSaveNewStrength');
    });

    $(document).on('click', "#btnSaveNewStrength", function () {
        var newStrengthName = $("#txtModelName").val();
        var newStrengthCode = $("#txtModelCode").val();
        if (newStrengthCode.length == 3) {
            if (newStrengthName != "" && newStrengthCode != "") {
                SAVE.SaveStrengthName(newStrengthName, newStrengthCode);
            }
            else {
                alert("Please enter a valid Strength Name and Strength Code");
            }
        } else {
            alert("Please enter a valid 3 character Strength Code");
        }
    });

    //gender
    $(document).on('click', "#ckChooseGender", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseGender").show();
            $("#lblGenderLabel").addClass("required");
        }
        else {
            $("#divChooseGender").hide();
            $("#lblGenderLabel").removeClass("required");
            $(".ckGender").prop("checked", false);
            window.genderOptionsCount = 0;
            window.genderOptions = [];
            $("#lblGender").text("Select Available Genders");
        }
    });

    $(document).on('click', ".ckGender", function () {
        var checked = this.dataset.ischecked;
        var genderId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.genderOptionsCount++;
            $("#lblGender").text(window.genderOptionsCount + " selected");
            window.genderOptions.push(genderId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.genderOptionsCount--;
            const index = window.genderOptions.indexOf(genderId);
            if (index > -1) {
                window.genderOptions.splice(index, 1);
            }
            if (window.genderOptionsCount < 1) {
                $("#lblGender").text("Select Available Genders");
            }
            else { $("#lblGender").text(window.genderOptionsCount + " selected"); }

        }
    });



    //other
    $(document).on('click', "#ckChooseOther", function () {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#divChooseOther").show();
            $("#lblOtherLabel").addClass("required");
        }
        else {
            $("#divChooseOther").hide();
            $("#lblOtherLabel").removeClass("required");
            $(".ckOther").prop("checked", false);
            window.otherOptionsCount = 0;
            window.otherOptions = [];
            $("#lblOther").text("Select Available Options");
        }
    });

    $(document).on('click', ".ckOther", function () {
        var checked = this.dataset.ischecked;
        var otherId = this.dataset.id;
        if (checked == "false") {
            $(this).find(".spnCheck").show();
            $(this).find(".spnSpc").hide();
            this.dataset.ischecked = "true";
            window.otherOptionsCount++;
            $("#lblOther").text(window.otherOptionsCount + " selected");
            window.otherOptions.push(otherId);
        }
        else {
            $(this).find(".spnCheck").hide();
            $(this).find(".spnSpc").show();
            this.dataset.ischecked = "false";
            window.otherOptionsCount--;
            const index = window.otherOptions.indexOf(otherId);
            if (index > -1) {
                window.otherOptions.splice(index, 1);
            }
            if (window.otherOptionsCount < 1) {
                $("#lblOther").text("Select Available Options");
            }
            else { $("#lblOther").text(window.otherOptionsCount + " selected"); }

        }
    });

    $(document).on('click', "#btnAddOther", function () {
        $("#spnModalTitle").text("Other");
        $("#lblModelName").text("Other Name:");
        $("#lblModelCode").text("Other Code:");
        $(".saveAddNew").prop('id', 'btnSaveNewOther');
    });

    $(document).on('click', "#btnSaveNewOther", function () {
        var newOtherName = $("#txtModelName").val();
        var newOtherCode = $("#txtModelCode").val();
        if (newOtherCode.length == 3) {
            if (newOtherName != "" && newOtherCode != "") {
                SAVE.SaveOtherName(newOtherName, newOtherCode);
            }
            else {
                alert("Please enter a valid Other Name and Other Code");
            }
        } else {
            alert("Please enter a valid 3 character Other Code");
        }
    });


    //MODAL
    $('#addModal').on('show.bs.modal', function (event) {
        $(this).find("input:text").val("");
        $("#divModelCode").show();
        $("#divModelTitle").hide();
        $("#divModelName").show();
        $("#divModelNameUOM").hide();
        $("#txtModelCode").attr('maxlength', '3');
        $("#txtModelCode").attr('placeholder', 'Enter 3 Digit Code');
    })

    $("#btnLoadProductTable").click(function () {
        //  $("#divLoadingProducts").show();
        var isValid = PRD.ValidateProductData();
        if (isValid) {
            INIT.LoadProductTable();
        }
    });

    $("#btnSaveProducts").click(function () {
        var isValid = PRD.ValidateTableData();
        if (isValid) {
            var productData = PRD.CollectTableData();
            SAVE.SaveProducts(productData);
        }
    });

    $(document).on('click', "#imgCopyVendorId", function () {
        var firstValue = $("#txtVendorId0").val();
        var firstId = $("#txtVendorId0").attr("data-vendorid");
        $('.txtVendorId').each(function () {
            $(this).val(firstValue);
            this.dataset.vendorid = firstId;
        });
    });

    $(document).on('click', "#imgCopyCost", function () {
        var firstValue = $("#txtCost0").val();
        $('.txtCost').each(function () {
            $(this).val(firstValue);
        });
    });

    $(document).on('click', "#imgCopyWeight", function () {
        var firstValue = $("#txtWeight0").val();
        $('.txtWeight').each(function () {
            $(this).val(firstValue);
        });
        var uomValue = $('#spnUOMSelectedWeight0').text();
        var uomId = $('#spnUOMSelectedWeight0').attr("data-value");
        if (uomValue != "") {

            $('.spnUOMSelectedWeight').each(function () {
                $(this).text(uomValue);
                $(this).attr("data-value", uomId);

            });
        }

    });

    $(document).on('click', "#imgCopyLength", function () {
        var firstValue = $("#txtLength0").val();
        $('.txtLength').each(function () {
            $(this).val(firstValue);
        });
        var uomValue = $('#spnUOMSelectedLength0').text();
        var uomId = $('#spnUOMSelectedLength0').attr("data-value");

        if (uomValue != "") {
            $('.spnUOMSelectedLength').each(function () {
                $(this).text(uomValue);
                $(this).attr("data-value", uomId);
            });
        }
    });

    $(document).on('click', "#imgCopyWidth", function () {
        var firstValue = $("#txtWidth0").val();
        $('.txtWidth').each(function () {
            $(this).val(firstValue);
        });
        var uomValue = $('#spnUOMSelectedWidth0').text();
        var uomId = $('#spnUOMSelectedWidth0').attr("data-value");
        if (uomValue != "") {
            $('.spnUOMSelectedWidth').each(function () {
                $(this).text(uomValue);
                $(this).attr("data-value", uomId);
            });
        }
    });

    $(document).on('click', "#imgCopyHeight", function () {
        var firstValue = $("#txtHeight0").val();
        $('.txtHeight').each(function () {
            $(this).val(firstValue);
        });
        var uomValue = $('#spnUOMSelectedHeight0').text();
        var uomId = $('#spnUOMSelectedHeight0').attr("data-value");
        if (uomValue != "") {
            $('.spnUOMSelectedHeight').each(function () {
                $(this).text(uomValue);
                $(this).attr("data-value", uomId);
            });
        }
    });

    $(document).on('click', ".liUOM", function () {
        var textValue = $(this).text();
        var idValue = $(this).val();
        var productId = this.dataset.productid;
        var isModal = this.dataset.ismodal;
        if (isModal == "false") {
            $("#spnUOMSelected" + productId + "").text(textValue);
            $("#spnUOMSelected" + productId + "").attr("data-value", idValue);
            if (window.firstPickUOM && !productId.includes("Weight")) {
                window.firstPickUOM = false;
                $(".spnUOMSelectedWidth, .spnUOMSelectedHeight, .spnUOMSelectedLength").each(function () {
                    var text = $(this).text();
                    if (text == "") {
                        $(this).text(textValue);
                        $(this).attr("data-value", idValue);
                    }

                });



            }
        }
        else {
            $("#spnModalUOMSelected").text(textValue);
            $("#spnModalUOMSelected").attr("data-value", idValue);
        }


    });


    $(document).on('click', ".ckNoUPC", function () {
        var checked = $(this).is(':checked');
        var id = this.dataset.id;
        if (checked) {

            $("#txtUPC" + id).val("");
            $("#txtUPC" + id).prop("disabled", true);
        }
        else {
            $("#txtUPC" + id).prop("disabled", false);
        }
    });

    $("#btnAssociateProducts").click(function () {
        $('#idAssociateItemsModal').modal('toggle');
        $("#ulNewProducts").empty();
        $("#ulOldProducts").empty();
        window.newProductList = []; 
        var count = $(".txtProductId").length;
        for (var i = 0; i < window.siblingItemList.length; i++) {
            $("#ulOldProducts").append('<li><div class="row prdMtchRow" style="padding-top:10px"><div class="col-sm-7"><span class="spnOldPrd">' + window.siblingItemList[i].selectedItemNo + ": " + window.siblingItemList[i].selectedItemDesc + '</span></div><div class="dropdown ddPrdSelectParent col-sm-4" style="padding:0px"><button class= "form-control dropdown-toggle" data-toggle="dropdown" href = "#" aria-expanded="false" >'
                + '<span id="lblNewPrd" class="lblNewPrd searchInput spanOverflow">Select Product</span> <span id="searchClear" hidden class="glyphicon glyphicon-remove-circle searchClear"></span>'
                + '</button><ul class="dropdown-menu dropdown-menu-regular ddmNewPrd"></ul>'
                + '</div></li></li>');
        }


        $(".txtProductId").each(function (i) {

            var prdId = this.value;
            window.newProductList.push(prdId);
            $(".ddmNewPrd").each(function () { $(this).append('<li class="liSelectedPrd' + i + '"><a class="ddSelectNewPrd" data-counter="' + i + '"><span class="dropdown-item-text spnPrdId" id="spnPrdId' + prdId + '">' + prdId + '</span></a></li>'); });
        });
        $(".searchClear").hide();
    });
    $(document).on('click', ".searchClear", function () {
        var currentText = $(this).prev().text();
        window.newProductList.push(currentText);
        $(this).prev().text('Select Product');
        $(this).hide();
        INIT.ReloadProductMatchOptions();
    });

    $(document).on('click', ".ddSelectNewPrd", function () {
        var currentText = $(this).parents(".ddPrdSelectParent").find(".lblNewPrd").text();
        if (currentText != "Select Product") {
            window.newProductList.push(currentText);
        }
        var selectedPrd = $(this).find(".spnPrdId").text();
        $(this).parents(".ddPrdSelectParent").find(".lblNewPrd").text(selectedPrd);
        $(this).parents(".ddPrdSelectParent").find(".searchClear").show();
        const index = window.newProductList.indexOf(selectedPrd);
        if (index > -1) {
            window.newProductList.splice(index, 1);
        }
        INIT.ReloadProductMatchOptions();



    });
    $(document).on('click', "#btnSaveAssPrd", function () {
        var isValid = PRD.ValidateAssociateProducts();
        if (isValid) {
            var productMatchList = [];
            $(".spnOldPrd").each(function () {
                var match = new Object();
                match.OldProductId = $(this).text().substr(0, $(this).text().indexOf(':'))
                var prdNew = $(this).parent().parent().find(".lblNewPrd").text();
                match.NewProductId = prdNew;
                productMatchList.push(match);
            });

            SAVE.SaveItemMapping(productMatchList);
        }
    });
});

var INIT = {
    GetRefactorPermissions: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetRefactorPermissions",
            data: {},
            success: function (res) {
                if (res.hasRefactorPermissions) {

                    $("#btnRefactorAMItem").show();
                   
                }
                else {
                    $("#btnRefactorAMItem").hide();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    //LoadAMProducts: function () {
    //    $.ajax({
    //        type: "POST",
    //        url: "../Add/GetAMProducts",
    //        data: {},
    //        success: function (res) {
    //            if (res.amProductList.length > 0) {


    //                for (var i = 0; i < res.amProductList.length; i++) {
    //                    window.amProductList.push(res.amProductList[i]);
    //                                       }
    //            }
    //            else {
    //                alert("Error while loading AM products");
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            alert(error);
    //        },
    //    });
    //},
    LoadSuppliers: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetSuppliers",
            data: {},
            success: function (res) {
                if (res.supplierList.length > 0) {


                    for (var i = 0; i < res.supplierList.length; i++) {
                        res.supplierList[i];
                        var checkBoxId = "ckSup" + res.supplierList[i].SupplierId;
                        var id = res.supplierList[i].SupplierId;
                        var checkBoxValue = res.supplierList[i].SupplierDescription;
                        var spanValue = res.supplierList[i].SupplierDescription;
                        var checkboxClass = "ckSupplier";
                        $('#ddmSupplier').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmSupplier').append(Shared.AddDropDownButton("btnAddSupplier", "Add Manufacturer"));
                    $("#lblSupplier").text("Select one");
                    window.supplierId = 0;
                    window.supplierDescription = "";
                }
                else {
                    alert("Error while loading manufacturers");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadBrands: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetBrands",
            data: {},
            success: function (res) {
                if (res.brandList.length > 0) {


                    for (var i = 0; i < res.brandList.length; i++) {
                        window.brandList.push(res.brandList[i]);
                        var _this = $("#txtBrand"),
                            _data = _this.data(),
                            _hidden_field = $('#' + _data.hidden_field_id);


                    }
                }
                else {
                    alert("Error while loading brands");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadVendors: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetVendors",
            data: {},
            success: function (res) {
                if (res.vendorList.length > 0) {


                    for (var i = 0; i < res.vendorList.length; i++) {
                        window.vendorList.push(res.vendorList[i]);
                        //var _this = $("#txtVendor"),
                        //    _data = _this.data(),
                        //    _hidden_field = $('#' + _data.hidden_field_id);


                    }
                    $(".txtVendorId").each(function () {
                        $(this).autocomplete({
                            minLength: 0,
                            autoFocus: true,

                            source: function (request, response) {
                                //window.vendorCode = "";
                                //window.ven = 0;
                                response($.map(window.vendorList, function (obj, key) {

                                    var VendorNo = obj.VendorNo.toUpperCase();

                                    if (VendorNo.indexOf(request.term.toUpperCase()) != -1) {
                                        return {
                                            label: obj.VendorNo, // Label for Display
                                            value: obj.VendorNo,
                                            data: obj.VendorId, // Value

                                        }
                                    } else {
                                        return null;
                                    }

                                }));

                            },

                            change: function (event, ui) {
                                if (ui.item == null)
                                    this.dataset.vendorid = "0";
                                else
                                    this.dataset.vendorid = ui.item.data;
                            },

                            select: function (event, ui) {
                                event.preventDefault();
                                $(this).val(ui.item.label);
                                this.dataset.vendorid = ui.item.data;
                                // window.brandDescription = ui.item.label;
                                // window.brandId = ui.item.data;
                                // ... any other tasks (like setting Hidden Fields) go here...
                            }
                        }).focus(function () {
                            $(this).autocomplete("search", "");
                        });
                    });
                }
                else {
                    alert("Error while loading vendors");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },


    LoadClasses: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetClasses",
            data: {},
            success: function (res) {

                if (res.classList.length > 0) {
                    for (var i = 0; i < res.classList.length; i++) {//level 1
                        var level1 = res.classList[i];
                        if (level1.ClassChildren.length > 0) {
                            $('#ddmClass1').append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level1.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass1Level2' + i + '">');
                            $('#ddmClass2').append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level1.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass2Level2' + i + '">');
                            $('#ddmClass3').append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level1.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass3Level2' + i + '">');


                            for (var j = 0; j < level1.ClassChildren.length; j++) {
                                var level2 = level1.ClassChildren[j];
                                if (level2.ClassChildren.length > 0) {
                                    $('#ddmClass1Level2' + i).append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level2.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass1Level3' + i + j + '">');
                                    $('#ddmClass2Level2' + i).append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level2.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass2Level3' + i + j + '">');
                                    $('#ddmClass3Level2' + i).append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level2.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass3Level3' + i + j + '">');

                                    for (var k = 0; k < level2.ClassChildren.length; k++) {
                                        var level3 = level2.ClassChildren[k];
                                        if (level3.ClassChildren.length > 0) {
                                            $('#ddmClass1Level3' + i + j).append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level3.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass1Level4' + i + j + k + '">');
                                            $('#ddmClass2Level3' + i + j).append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level3.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass2Level4' + i + j + k + '">');
                                            $('#ddmClass3Level3' + i + j).append('<li class="dropdown-submenu"><a href="#" class="test" tabindex = "-1"><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level3.Description + '<span class="caret" ></span ></a><ul class="dropdown-menu" id="ddmClass3Level4' + i + j + k + '">');


                                            for (var l = 0; l < level3.ClassChildren.length; l++) {
                                                var level4 = level3.ClassChildren[l];
                                                $('#ddmClass1Level4' + i + j + k).append('<li><a href="#" class="liClass1" id="liClass1' + level4.RevNo + '" data-revno="' + level4.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level4.Description + '</a></li>');
                                                $('#ddmClass2Level4' + i + j + k).append('<li><a href="#" class="liClass2" id="liClass2' + level4.RevNo + '" data-revno="' + level4.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level4.Description + '</a></li>');
                                                $('#ddmClass3Level4' + i + j + k).append('<li><a href="#" class="liClass3" id="liClass3' + level4.RevNo + '" data-revno="' + level4.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level4.Description + '</a></li>');

                                            }
                                            $('#ddmClass1Level3' + i + j).append('</ul>');
                                            $('#ddmClass2Level3' + i + j).append('</ul>');
                                            $('#ddmClass3Level3' + i + j).append('</ul>');

                                        }
                                        else {
                                            $('#ddmClass1Level3' + i + j).append('<li><a href="#" class="liClass1" id="liClass1' + level3.RevNo + '" data-revno="' + level3.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level3.Description + '</a></li>');
                                            $('#ddmClass2Level3' + i + j).append('<li><a href="#" class="liClass2" id="liClass2' + level3.RevNo + '" data-revno="' + level3.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level3.Description + '</a></li>');
                                            $('#ddmClass3Level3' + i + j).append('<li><a href="#" class="liClass3" id="liClass3' + level3.RevNo + '" data-revno="' + level3.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level3.Description + '</a></li>');

                                        }
                                    }
                                    $('#ddmClass1Level3' + i + j).append('</ul>');
                                    $('#ddmClass2Level3' + i + j).append('</ul>');
                                    $('#ddmClass3Level3' + i + j).append('</ul>');
                                }
                                else {
                                    $('#ddmClass1Level2' + i).append('<li><a href="#" class="liClass1" id="liClass1' + level2.RevNo + '" data-revno="' + level2.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level2.Description + '</a></li>');
                                    $('#ddmClass2Level2' + i).append('<li><a href="#" class="liClass2" id="liClass2' + level2.RevNo + '" data-revno="' + level2.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level2.Description + '</a></li>');
                                    $('#ddmClass3Level2' + i).append('<li><a href="#" class="liClass3" id="liClass3' + level2.RevNo + '" data-revno="' + level2.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level2.Description + '</a></li>');

                                }
                            }

                            $('#ddmClass1Level2' + i).append('</ul>');
                            $('#ddmClass2Level2' + i).append('</ul>');
                            $('#ddmClass3Level2' + i).append('</ul>');
                        }
                        else {
                            $('#ddmClass1').append('<li><a href="#" class="liClass1"  id="liClass1' + level1.RevNo + '" data-revno="' + level1.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level1.Description + '</a></li>');
                            $('#ddmClass2').append('<li><a href="#" class="liClass2"  id="liClass2' + level1.RevNo + '" data-revno="' + level1.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level1.Description + '</a></li>');
                            $('#ddmClass3').append('<li><a href="#" class="liClass3"  id="liClass3' + level1.RevNo + '" data-revno="' + level1.RevNo + '" data-ischecked="false" tabindex="-1"><span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span> ' + level1.Description + '</a></li>');


                        }

                    }


                }
                else {
                    alert("Error while loading classes.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },


    LoadTypes: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetTypes",
            data: {},
            success: function (res) {
                if (res.typeList.length > 0) {

                    for (var i = 0; i < res.typeList.length; i++) {
                        res.typeList[i];
                        var checkBoxId = "ckType" + res.typeList[i].ctype.trim();
                        var id = res.typeList[i].ctype.trim();
                        var checkBoxValue = res.typeList[i].ctypedesc.trim();
                        var spanValue = res.typeList[i].ctypedesc.trim();
                        var checkboxClass = "ckType";
                        $('#ddmType').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }


                    $("#lblType").text("Select one");
                    window.typeId = 0;
                    window.typeDescription = "";
                } else {
                    alert("Error while loading Types.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },


    LoadColors: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetColors",
            data: {},
            success: function (res) {
                if (res.colorList.length > 0) {

                    for (var i = 0; i < res.colorList.length; i++) {
                        res.colorList[i];
                        var checkBoxId = "ckColor" + res.colorList[i].ColorId;
                        var id = res.colorList[i].ColorId;
                        var checkBoxValue = res.colorList[i].ColorDescription;
                        var spanValue = res.colorList[i].ColorDescription;
                        var checkboxClass = "ckColor";
                        $('#ddmColor').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmColor').append(Shared.AddDropDownButton("btnAddColor", "Add Color"));
                    $("#lblColor").text("Select Available Colors");
                    window.colorOptionsCount = 0;
                    window.colorOptions = [];
                }
                else {
                    alert("Error while loading colors.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadSizes: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetSizes",
            data: {},
            success: function (res) {
                if (res.sizeList.length > 0) {


                    for (var i = 0; i < res.sizeList.length; i++) {
                        $('#ddmSize').append(Shared.AddDropDownHeader(res.sizeList[i].SizeTitle));
                        for (var j = 0; j < res.sizeList[i].SizeList.length; j++) {
                            var checkBoxId = "ckSize" + res.sizeList[i].SizeList[j].SizeId;
                            var id = res.sizeList[i].SizeList[j].SizeId;
                            var checkBoxValue = res.sizeList[i].SizeList[j].SizeDescription;
                            var spanValue = res.sizeList[i].SizeList[j].SizeDescription;
                            var checkboxClass = "ckSize";
                            $('#ddmSize').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                        }
                    }
                    $('#ddmSize').append(Shared.AddDropDownButton("btnAddSize", "Add Size"));
                    $("#lblSize").text("Select Available Sizes");
                    window.sizeOptionsCount = 0;
                    window.sizeOptions = [];
                } else {
                    alert("Error while loading Sizes.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadSizeTitles: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetSizeTitles",
            data: {},
            success: function (res) {
                if (res.sizeTitleList.length > 0) {


                    for (var i = 0; i < res.sizeTitleList.length; i++) {
                        res.sizeTitleList[i];
                        var checkBoxId = "ckSizeTitle" + res.sizeTitleList[i].SizeTitleId;
                        var id = res.sizeTitleList[i].SizeTitleId;
                        var checkBoxValue = res.sizeTitleList[i].SizeTitle;
                        var spanValue = res.sizeTitleList[i].SizeTitle;
                        var checkboxClass = "ckSizeTitle";
                        $('#ddmTitle').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }
                }
                else {
                    alert("Error while loading Size Titles");
                }
                // $('#ddmSizeTitle').append(Shared.AddDropDownButton("btnAddSizeTitle", "Add Size Title"));
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadOrientations: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetOrientations",
            data: {},
            success: function (res) {
                if (res.orientationList.length > 0) {


                    for (var i = 0; i < res.orientationList.length; i++) {
                        res.orientationList[i];
                        var checkBoxId = "ckOrientation" + res.orientationList[i].OrientationId;
                        var id = res.orientationList[i].OrientationId;
                        var checkBoxValue = res.orientationList[i].OrientationDescription;
                        var spanValue = res.orientationList[i].OrientationDescription;
                        var checkboxClass = "ckOrientation";
                        $('#ddmOrientation').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmOrientation').append(Shared.AddDropDownButton("btnAddOrientation", "Add Orientation"));
                    $("#lblOrientation").text("Select Available Orientations");
                    window.orientationOptionsCount = 0;
                    window.orientationOptions = [];
                }
                else {
                    alert("Error while loading orientation list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadFlavors: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetFlavors",
            data: {},
            success: function (res) {
                if (res.flavorList.length > 0) {

                    for (var i = 0; i < res.flavorList.length; i++) {
                        res.flavorList[i];
                        var checkBoxId = "ckFlavor" + res.flavorList[i].FlavorId;
                        var id = res.flavorList[i].FlavorId;
                        var checkBoxValue = res.flavorList[i].FlavorDescription;
                        var spanValue = res.flavorList[i].FlavorDescription;
                        var checkboxClass = "ckFlavor";
                        $('#ddmFlavor').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmFlavor').append(Shared.AddDropDownButton("btnAddFlavor", "Add Flavor"));
                    $("#lblFlavor").text("Select Available Flavors");
                    window.flavorOptionsCount = 0;
                    window.flavorOptions = [];
                }
                else {
                    alert("Error while loading flavor list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadPackagings: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetPackagings",
            data: {},
            success: function (res) {
                if (res.packagingList.length > 0) {


                    for (var i = 0; i < res.packagingList.length; i++) {
                        res.packagingList[i];
                        var checkBoxId = "ckPackaging" + res.packagingList[i].PackagingId;
                        var id = res.packagingList[i].PackagingId;
                        var checkBoxValue = res.packagingList[i].PackagingDescription;
                        var spanValue = res.packagingList[i].PackagingDescription;
                        var checkboxClass = "ckPackaging";
                        $('#ddmPackaging').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmPackaging').append(Shared.AddDropDownButton("btnAddPackaging", "Add Packaging"));
                    $("#lblPackaging").text("Select Available Packaging");
                    window.packagingOptionsCount = 0;
                    window.packagingOptions = [];
                } else {
                    alert("Error while loading packaging list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadUOMs: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetUOMs",
            data: {},
            success: function (res) {
                if (res.uomList.length > 0) {


                    for (var i = 0; i < res.uomList.length; i++) {
                        res.uomList[i];
                        var checkBoxId = "ckUOM" + res.uomList[i].UnitOfMeasureId;
                        var id = res.uomList[i].UnitOfMeasureId;
                        var checkBoxValue = res.uomList[i].UnitOfMeasureDescription;
                        var spanValue = res.uomList[i].UnitOfMeasureDescription;
                        var checkboxClass = "ckUOM";
                        $('#ddmUOM').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmUOM').append(Shared.AddDropDownButton("btnAddUOM", "Add UOM"));
                    $("#lblUOM").text("Select Available UOM");
                    window.uomOptionsCount = 0;
                    window.uomOptions = [];
                }
                else {
                    alert("Error while loading UOM list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadStrengths: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetStrengths",
            data: {},
            success: function (res) {
                if (res.strengthList.length > 0) {


                    for (var i = 0; i < res.strengthList.length; i++) {
                        res.strengthList[i];
                        var checkBoxId = "ckStrength" + res.strengthList[i].StrengthId;
                        var id = res.strengthList[i].StrengthId;
                        var checkBoxValue = res.strengthList[i].StrengthDescription;
                        var spanValue = res.strengthList[i].StrengthDescription;
                        var checkboxClass = "ckStrength";
                        $('#ddmStrength').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmStrength').append(Shared.AddDropDownButton("btnAddStrength", "Add Strength"));
                    $("#lblStrength").text("Select Available Strength");
                    window.strengthOptionsCount = 0;
                    window.strengthOptions = [];
                }
                else {
                    alert("Error while loading strength list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadGenders: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetGenders",
            data: {},
            success: function (res) {
                if (res.genderList.length > 0) {

                    for (var i = 0; i < res.genderList.length; i++) {
                        res.genderList[i];
                        var checkBoxId = "ckGender" + res.genderList[i].GenderId;
                        var id = res.genderList[i].GenderId;
                        var checkBoxValue = res.genderList[i].GenderDescription;
                        var spanValue = res.genderList[i].GenderDescription;
                        var checkboxClass = "ckGender";
                        $('#ddmGender').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }
                } else {
                    alert("Error while loading Genders.");
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadOthers: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetOthers",
            data: {},
            success: function (res) {
                if (res.otherList.length > 0) {

                    for (var i = 0; i < res.otherList.length; i++) {
                        res.otherList[i];
                        var checkBoxId = "ckOther" + res.otherList[i].OtherId;
                        var id = res.otherList[i].OtherId;
                        var checkBoxValue = res.otherList[i].OtherDescription;
                        var spanValue = res.otherList[i].OtherDescription;
                        var checkboxClass = "ckOther";
                        $('#ddmOther').append(Shared.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
                    }

                    $('#ddmOther').append(Shared.AddDropDownButton("btnAddOther", "Add Other"));
                    $("#lblOther").text("Select Available Options");
                    window.otherOptionsCount = 0;
                    window.otherOptions = [];
                }
                else {
                    alert("Error while loading other list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadUOMCategories: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetUOMCategories",
            data: {},
            success: function (res) {
                if (res.uomList.length > 0) {

                    for (var i = 0; i < res.uomList.length; i++) {
                        window.uomCategories.push(res.uomList[i]);
                    }
                } else {
                    alert("Error while loading UOM Categories.");
                }


            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadProductTable: function () {
        var isManual = $("#ckManual").is(':checked');
        var productData = PRD.CollectFormData();
        //  $('.progress-bar').css('width', '50%');
        $.ajax({
            type: "POST",
            url: "../Add/GenerateProductIds",
            data: "&productData=" + productData,
            success: function (res) {
                // $('.progress-bar').css('width', '75%');
                $('#tblProducts tr').not(function () { return !!$(this).has('th').length; }).remove();
                if (res.productList.length > 0) {
                    window.firstPickUOM = true;

                    window.productList = res.productList;
                    window.brandId = res.productList[0].BrandId;

                    for (var i = 0; i < res.productList.length; i++) {

                        if (isManual) {
                            Shared.AddTableRow(i, "", "", "", "", "");
                        }
                        else {
                            var weight = "";
                            var cost = "";
                            var upc = "";
                            if (window.parentAMItem != undefined) {

                                weight = window.parentAMItem.nweight != null && window.parentAMItem.nweight != "" && window.parentAMItem.nweight != 0 ? window.parentAMItem.nweight : "";
                                cost = window.parentAMItem.nstdcost != null && window.parentAMItem.nstdcost != "" && window.parentAMItem.nstdcost != 0 ? window.parentAMItem.nstdcost : "";
                                upc = window.parentAMItem.cbarcode1 != null && window.parentAMItem.cbarcode1 != "" && window.parentAMItem.cbarcode1 != 0 ? window.parentAMItem.cbarcode1 : "";
                            }


                            Shared.AddTableRow(i, res.productList[i].ProductSku, res.productList[i].ProductDescription, weight, cost, upc);
                        }
                    }
                    $('.ddmUOMCategory').each(function () {
                        var newUOMCatgList = window.uomCategories.filter(x => x.UOMType === this.dataset.uomtype);

                        for (var j = 0; j < newUOMCatgList.length; j++) {

                            $(this).append(Shared.AddUOMddOption(newUOMCatgList[j].UOMCode, newUOMCatgList[j].UOMDescription, newUOMCatgList[j].UOMCategoryId, this.dataset.productid, false))
                        }
                    });
                    INIT.LoadVendors();

                    //   $('.progress-bar').css('width', '100%');
                    //   $("#divLoadingProducts").hide();

                    $("#divProductGrid").show();
                    var isRefactor = $("#btnRefactorAMItem").text() == "Refactor AM Product" ? false : true;
                    if (isRefactor) {
                        $("#divAssociateProductsBtn").show();
                        $("#divSaveProductsButton").hide();
                    }
                    else {
                        $("#divSaveProductsButton").show();
                        $("#divAssociateProductsBtn").hide();
                    }

                }
                else {
                    alert("Error while loading products grid.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });

    },

    LoadUOMBases: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetUOMBases",
            data: {},
            success: function (res) {
                if (res.uomList.length > 0) {

                    for (var i = 0; i < res.uomList.length; i++) {
                        window.uomBases.push(res.uomList[i]);

                        $(".ddmModalUOM").append(Shared.AddUOMddOption('&nbsp;&nbsp;' + res.uomList[i].UOMDescription, res.uomList[i].UOMCategoryId, res.uomList[i].UOMCode, true))
                    }
                } else {
                    alert("Error when loading UOM Bases.");
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    FindAMItem: function (arg, itemNo) {
        $.ajax({
            type: "POST",
            url: "../Add/GetAMProduct",
            data: "&itemNo=" + itemNo,
            success: function (res) {
                if (res.amItem != null) {
                    $("#spnItemNotFound").hide();
                    $("#divScreen1").hide();
                    $("#divScreen2").show();
                    arg.dataset.modalscreenno = "2";
                    $(".btnRefactorBack").attr("data-modalscreenno", "2");
                    $("#spnItemInfo").text(res.amItem.citemno + " - " + res.amItem.cdescript + " - " + res.amItem.cvendno);
                    window.additionalItemNo = res.amItem.citemno;
                    window.additionalItemDesc = res.amItem.cdescript;
                    window.parentAMItem = res.amItem;
                    INIT.FindSiblingItems(res.amItem);

                } else {
                    alert("Item no: " + itemNo + " was not found in AM.");
                    //  $("#spnItemNotFound").show();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    FindAddtAMItem: function (arg, amItemNo) {
        $.ajax({
            type: "POST",
            url: "../Add/GetAMProduct",
            data: "&itemNo=" + amItemNo,
            success: function (res) {
                if (res.amItem != null) {
                    Shared.AddSiblingsTableRow(amItemNo, res.amItem.citemno, res.amItem.cdescript, res.amItem.cvendno);
                    $(arg).parents(".trEditRow").empty();
                    Shared.ScrollSmoothToBottom("divSiblingTblContainer");
                } else {
                    // $("#spnItemNotFound").show();
                    alert("Item no: " + amItemNo + " was not found in AM.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    FindSiblingItems: function (amItem) {
        $.ajax({
            type: "POST",
            url: "../Add/GetSiblingItems",
            data: "&itemNo=" + amItem.citemno + "&desc=" + amItem.cdescript,
            success: function (res) {
                if (res.siblingList.length > 0) {
                    $("#trNoRecords").hide();
                    $('#tblSiblingItems tbody tr').not(function () { return !!$(this).has('th').length; }).remove();

                    for (var i = 0; i < res.siblingList.length; i++) {
                        Shared.AddSiblingsTableRow(i, res.siblingList[i].citemno, res.siblingList[i].cdescript, res.siblingList[i].cvendno);
                    }

                    var searchItemText = amItem.citemno.substring(0, 4).toUpperCase();
                    $(".spnSiblingItemNo").each(function () {
                        var modifiedValue = $(this).html().toUpperCase().replace(new RegExp(searchItemText, 'g'), '<span class="text-info">' + searchItemText + '</span>');
                        $(this).html(modifiedValue);
                    });
                    var searchDescText = amItem.cdescript.substring(0, 12).toUpperCase();
                    $(".spnSiblingItemDesc").each(function () {
                        var modifiedValue = $(this).html().toUpperCase().replace(new RegExp(searchDescText, 'g'), '<span class="text-info">' + searchDescText + '</span>');
                        $(this).html(modifiedValue);
                    });

                }
                else {
                    //  $("#trNoRecords").show();
                    //       $('#tblSiblingItems tbody tr').not(function () { return !!$(this).has('th').length; }).remove();
                    Shared.AddNoRecordsRow();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    ReloadProductMatchOptions: function () {
        $(".ddmNewPrd").each(function () {
            $(this).empty();
        });
        for (var i = 0; i < window.newProductList.length; i++) {

            $(".ddmNewPrd").each(function () {
                $(this).append('<li class="liSelectedPrd' + i + '"><a class="ddSelectNewPrd" data-counter="' + i + '"><span class="dropdown-item-text spnPrdId" id="spnPrdId' + window.newProductList[i] + '">' + window.newProductList[i] + '</span></a></li>');
            });
        }
    },
};

var SAVE = {

    SaveSupplierName: function (newSupplierName) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewSupplier",
            data: "&newSupplierName=" + newSupplierName,
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while saving new Manufacturer: \n" + res.result);
                }
                else {
                    alert("Successfully added new manufacturer.");
                    $('#addModal').modal('toggle');
                    $('#ddmSupplier').empty();
                    INIT.LoadSuppliers();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    //SaveClassName: function (newClassName, newClassCode) {
    //    $.ajax({
    //        type: "POST",
    //        url: "../Add/SaveNewClass",
    //        data: "&newClassName=" + newClassName + "&newClassCode=" + newClassCode,
    //        success: function (res) {
    //            if (res.result != "success") {
    //                alert("Error while saving new Class: \n" + res.result);
    //            }
    //            else {
    //                alert("Successfully added new class.");
    //                $('#addModal').modal('toggle');
    //                $('#ddmClass').empty();
    //                INIT.LoadClasses();
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            alert(error);
    //        },
    //    });
    //},

    SaveColorName: function (newColorName, newColorCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewColor",
            data: "&newColorName=" + newColorName + "&newColorCode=" + newColorCode,
            success: function (res) {
                if (res.result == "Success") {

                    alert("Successfully added new Color.");
                    $('#addModal').modal('toggle');
                    $('#ddmColor').empty();
                    INIT.LoadColors();
                }
                else if (res.result == "Code Exists") {
                    alert(newColorCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Color: \n" + res.result);
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SaveSizeName: function (newSizeName, newSizeCode, newSizeTitleId) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewSize",
            data: "&newSizeName=" + newSizeName + "&newSizeCode=" + newSizeCode + "&newSizeTitleId=" + newSizeTitleId,
            success: function (res) {
                if (res.result == "Success") {

                    alert("Successfully added new Size.");
                    $('#addModal').modal('toggle');
                    $('#ddmSize').empty();
                    INIT.LoadSizes();
                }
                else if (res.result == "Code Exists") {
                    alert(newSizeCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Size: \n" + res.result);
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SaveOrientationName: function (newOrientationName, newOrientationCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewOrientation",
            data: "&newOrientationName=" + newOrientationName + "&newOrientationCode=" + newOrientationCode,
            success: function (res) {


                if (res.result == "Success") {

                    alert("Successfully added new Orientation.");
                    $('#addModal').modal('toggle');
                    $('#ddmOrientation').empty();
                    INIT.LoadOrientations();
                }
                else if (res.result == "Code Exists") {
                    alert(newOrientationCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Orientation: \n" + res.result);
                }


            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SaveFlavorName: function (newFlavorName, newFlavorCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewFlavor",
            data: "&newFlavorName=" + newFlavorName + "&newFlavorCode=" + newFlavorCode,
            success: function (res) {
                if (res.result == "Success") {

                    alert("Successfully added new Flavor.");
                    $('#addModal').modal('toggle');
                    $('#ddmFlavor').empty();
                    INIT.LoadFlavors();
                }
                else if (res.result == "Code Exists") {
                    alert(newFlavorCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Flavor: \n" + res.result);
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SavePackagingName: function (newPackagingName, newPackagingCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewPackaging",
            data: "&newPackagingName=" + newPackagingName + "&newPackagingCode=" + newPackagingCode,
            success: function (res) {

                if (res.result == "Success") {

                    alert("Successfully added new Packaging.");
                    $('#addModal').modal('toggle');
                    $('#ddmPackaging').empty();
                    INIT.LoadPackagings();
                }
                else if (res.result == "Code Exists") {
                    alert(newPackagingCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Packaging: \n" + res.result);
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SaveUOMName: function (newUOMFactor, newUOMBase, newUOMCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewUOM",
            data: "&newUOMFactor=" + newUOMFactor + "&newUOMBase=" + newUOMBase + "&newUOMCode=" + newUOMCode,
            success: function (res) {
                if (res.result == "Success") {

                    alert("Successfully added new UOM.");
                    $('#addModal').modal('toggle');
                    $('#ddmUOM').empty();
                    INIT.LoadUOMs();
                }
                else if (res.result == "Code Exists") {
                    alert(newUOMCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new UOM: \n" + res.result);
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SaveStrengthName: function (newStrengthName, newStrengthCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewStrength",
            data: "&newStrengthName=" + newStrengthName + "&newStrengthCode=" + newStrengthCode,
            success: function (res) {
                if (res.result == "Success") {

                    alert("Successfully added new Strength.");
                    $('#addModal').modal('toggle');
                    $('#ddmStrength').empty();
                    INIT.LoadStrengths();
                }
                else if (res.result == "Code Exists") {
                    alert(newStrengthCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Strength: \n" + res.result);
                }


            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    SaveOtherName: function (newOtherName, newOtherCode) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveNewOther",
            data: "&newOtherName=" + newOtherName + "&newOtherCode=" + newOtherCode,
            success: function (res) {
                if (res.result == "Success") {

                    alert("Successfully added new Other.");
                    $('#addModal').modal('toggle');
                    $('#ddmOther').empty();
                    INIT.LoadOthers();
                }
                else if (res.result == "Code Exists") {
                    alert(newOtherCode + " code already exists, please enter a new code.");
                }
                else {
                    alert("Error while saving new Other: \n" + res.result);
                }

            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },


    SaveProducts: function (productData) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveProducts",
            data: "&productData=" + JSON.stringify(productData),
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while saving products: \n" + res.result);
                }
                else {
                    alert("Products where successfully saved! \nPlease note, products will not appear in System until they are approved.");
                    location.reload();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });

    },

    SaveItemMapping: function (productMatchList) {
        $.ajax({
            type: "POST",
            url: "../Add/SaveItemMapping",
            data: "&productMatchList=" + JSON.stringify(productMatchList),
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while saving product mapping: \n" + res.result);
                }
                else {
                    $("#divSaveProductsButton").show();
                    $("#divAssociateProductsBtn").hide();
                    $('#idAssociateItemsModal').modal('toggle');
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },
};

var PRD = {
    CollectFormData() {

        var productData = new Object();

        productData.ProductIdPrefix = $("#txtPrdIdPrfx").val();
        productData.BaseItemDescription = $("#txtBsItmDesc").val();
        productData.SupplierId = window.supplierId;
        productData.SupplierDescription = window.supplierDescription;
        productData.BrandDescription = $("#txtBrand").val();
        productData.BrandId = window.brandId;
        productData.ClassId1 = window.classId1;
        productData.ClassDescription1 = window.classDescription1;
        productData.ClassId2 = window.classId2;
        productData.ClassDescription2 = window.classDescription2;
        productData.ClassId3 = window.classId3;
        productData.ClassDescription3 = window.classDescription3;
        productData.TypeId = window.typeId;
        productData.TypeDescription = window.typeDescription;
        productData.IsOneTime = $("#ckOneTime").is(':checked');
        productData.VendorId = $("#txtVendorId").val();
        productData.VendorPartNo = $("#txtVendorPartNo").val();


        productData.ColorIdList = window.colorOptions;
        productData.SizeIdList = window.sizeOptions;
        productData.OrientationIdList = window.orientationOptions;
        productData.FlavorIdList = window.flavorOptions;
        productData.PackagingIdList = window.packagingOptions;
        productData.UOMIdList = window.uomOptions;
        productData.StrengthIdList = window.strengthOptions;
        productData.GenderIdList = window.genderOptions;
        productData.OtherIdList = window.otherOptions;

        return encodeURIComponent(JSON.stringify(productData));
    },

    ValidateProductData: function () {
        var invalidCount = 0;
        var prdPrf = $("#txtPrdIdPrfx").val();
        if (prdPrf == "") { $("#divProductIdPrefix").addClass('has-error'); invalidCount++; }
        else {
            // $("#divProductIdPrefix").removeClass('has-error');
            var firstLetter = prdPrf.substring(0, 1);
            var reg = /^[a-zA-Z]$/;
            var isMatch = reg.test(firstLetter);
            if (!isMatch) {
                $("#divProductIdPrefix").addClass('has-error');
                $("#txtPrdIdPrfx").val("");
                $("#divPrdIdError").show();

            }
            else {
                $("#divPrdIdError").hide();
                $("#divProductIdPrefix").removeClass('has-error');
            }
        }

        var baseDesc = $("#txtBsItmDesc").val();
        if (baseDesc == "") { $("#divBaseItemDesc").addClass('has-error'); invalidCount++; }
        else { $("#divBaseItemDesc").removeClass('has-error'); }

        //if (window.supplierId == 0) { $("#divSupplier").addClass('has-error'); invalidCount++; }
        //else { $("#divSupplier").removeClass('has-error'); }

        var brandDesc = $("#txtBrand").val();
        if (brandDesc == "") { $("#divBrand").addClass('has-error'); invalidCount++; }
        else { $("#divBrand").removeClass('has-error'); }

        if (window.classId1 == "0") { $("#divClass1").addClass('has-error'); invalidCount++; }
        else { $("#divClass1").removeClass('has-error'); }

        if (window.typeId == "") { $("#divType").addClass('has-error'); invalidCount++; }
        else { $("#divType").removeClass('has-error'); }


        $('.txtVendorId').each(function () {
            // invalidCount = invalidCount + PRD.CheckValue(this);
            var isFromDD = this.dataset.vendorid == "0" && this.value != "" ? true : false;
            if (isFromDD) {
                invalidCount = invalidCount + 1;
                alert("Please select a valid Vendor Id from the list. \nPlease contact system admin to add a new Vendor.")
            }
        });

        var hasColor = $("#ckChooseColor").is(':checked');
        if (hasColor && window.colorOptionsCount < 1) {
            $("#divChooseColor").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseColor").removeClass('has-error'); }

        var hasSize = $("#ckChooseSize").is(':checked');
        if (hasSize && window.sizeOptionsCount < 1) {
            $("#divChooseSize").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseSize").removeClass('has-error'); }

        var hasOrnt = $("#ckChooseOrientation").is(':checked');
        if (hasOrnt && window.orientationOptionsCount < 1) {
            $("#divChooseOrientation").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseOrientation").removeClass('has-error'); }


        var hasFlavor = $("#ckChooseFlavor").is(':checked');
        if (hasFlavor && window.flavorOptionsCount < 1) {
            $("#divChooseFlavor").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseFlavor").removeClass('has-error'); }

        var hasPackg = $("#ckChoosePackaging").is(':checked');
        if (hasPackg && window.packagingOptionsCount < 1) {
            $("#divChoosePackaging").addClass('has-error'); invalidCount++;
        }
        else { $("#divChoosePackaging").removeClass('has-error'); }


        var hasUOM = $("#ckChooseUOM").is(':checked');
        if (hasUOM && window.uomOptionsCount < 1) {
            $("#divChooseUOM").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseUOM").removeClass('has-error'); }


        var hasStrength = $("#ckChooseStrength").is(':checked');
        if (hasStrength && window.strengthOptionsCount < 1) {
            $("#divChooseStrength").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseStrength").removeClass('has-error'); }


        var hasGender = $("#ckChooseGender").is(':checked');
        if (hasGender && window.genderOptionsCount < 1) {
            $("#divChooseGender").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseGender").removeClass('has-error'); }


        var hasOther = $("#ckChooseOther").is(':checked');
        if (hasOther && window.otherOptionsCount < 1) {
            $("#divChooseOther").addClass('has-error'); invalidCount++;
        }
        else { $("#divChooseOther").removeClass('has-error'); }

        var isValid = invalidCount > 0 ? false : true;

        return isValid;
    },

    CollectTableData: function () {
        window.productList;
        for (var i = 0; i < window.productList.length; i++) {
            window.productList[i].UPC = $("#txtUPC" + i).val();
            window.productList[i].NoUPCFound = $("#ckNoUPC" + i).is(':checked');
            // window.productList[i].VendorId = $("#txtVendorId" + i).val();
            window.productList[i].Cost = $("#txtCost" + i).val();
            window.productList[i].Weight = $("#txtWeight" + i).val();
            window.productList[i].Length = $("#txtLength" + i).val();
            window.productList[i].Width = $("#txtWidth" + i).val();
            window.productList[i].Height = $("#txtHeight" + i).val();

            window.productList[i].WeightUOMId = $("#spnUOMSelectedWeight" + i).attr("data-value");
            window.productList[i].LengthUOMId = $("#spnUOMSelectedLength" + i).attr("data-value");
            window.productList[i].WidthUOMId = $("#spnUOMSelectedWidth" + i).attr("data-value");
            window.productList[i].HeightUOMId = $("#spnUOMSelectedHeight" + i).attr("data-value");

            window.productList[i].ProductSku = $("#txtProductId" + i).val();
            window.productList[i].ProductIdPrefix = $("#txtPrdIdPrfx").val();
            window.productList[i].ProductBaseDescription = $("#txtBsItmDesc").val();
            window.productList[i].ProductDescription = $("#txtProductDesc" + i).val();
            window.productList[i].SupplierId = window.supplierId;
            window.productList[i].Brand = $("#txtBrand").val();
            window.productList[i].BrandId = window.brandId;
            window.productList[i].ClassId1 = window.classId1;
            window.productList[i].ClassDescription1 = window.classDescription1;
            window.productList[i].ClassId2 = window.classId2;
            window.productList[i].ClassDescription2 = window.classDescription2;
            window.productList[i].ClassId3 = window.classId3;
            window.productList[i].ClassDescription3 = window.classDescription3;
            window.productList[i].TypeId = window.typeId;
            window.productList[i].VendorId = $("#txtVendorId").val();
            window.productList[i].VendorPartNo = $("#txtVendorPartNo").val();
            window.productList[i].IsOneTimeProduct = $("#ckOneTime").is(':checked');
            window.productList[i].CreatedBy = window.userId;
        }
        return window.productList;
    },

    ValidateTableData: function () {
        var invalidCount = 0;
        $('.txtProductId').each(function () {
            if (this.value.length > 20 || this.value == "") {
                invalidCount = invalidCount + 1;
                $(this).parent().addClass('has-error');
                if (this.value.length > 20) {
                    alert("Product Id cannot exceed 20 characters.");
                }
            }
            else {
                $(this).parent().removeClass('has-error');
            }

        });

        $('.txtVendorId').each(function () {
            // invalidCount = invalidCount + PRD.CheckValue(this);
            var isFromDD = this.dataset.vendorid == "0" && this.value != "" ? true : false;
            if (isFromDD) {
                invalidCount = invalidCount + 1;
                alert("Please select a valid Vendor Id from the list. \nPlease contact system admin to add a new Vendor.")
            }
        });

        $('.txtUPC').each(function () {
            var value = $(this).val();
            var id = this.dataset.id;
            var noUPC = $("#ckNoUPC" + id).is(':checked');

            if (value == "" && !noUPC) {
                $(this).parent().addClass('has-error'); invalidCount = invalidCount + 1;
            }
            else {
                $(this).parent().removeClass('has-error');
            }

        });
        $('.txtCost').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this);
        });
        $('.txtWeight').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this);
        });
        $('.txtLength').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this);
        });

        $('.txtWidth').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this);
        });
        $('.txtHeight').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this);
        });
        $('.spnUOMSelectedWeight').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this, true);
        });
        $('.spnUOMSelectedLength').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this, true);
        });
        $('.spnUOMSelectedWidth').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this, true);
        });
        $('.spnUOMSelectedHeight').each(function () {
            invalidCount = invalidCount + PRD.CheckValue(this, true);
        });
        var isValid = invalidCount > 0 ? false : true;

        return isValid;

    },

    CheckValue: function (arg, isSpan = false) {
        if (isSpan) {
            var value = $(arg).text();
            if (value == "") {
                $(arg).parent().parent().addClass('has-error'); return 1;
            }
            else {
                $(arg).parent().parent().removeClass('has-error'); return 0;
            }
        }
        else {
            var value = $(arg).val();
            if (value == "") {
                $(arg).parent().addClass('has-error'); return 1;
            }
            else {
                $(arg).parent().removeClass('has-error'); return 0;
            }
        }
    },

    ValidateAssociateProducts: function () {
        var invalidCount = 0;
        $(".lblNewPrd").each(function () {
            var lblText = $(this).text();
            if (lblText == "Select Product") {
                $(this).parent().parent().addClass('has-error');
                invalidCount++;
            }
            else {
                $(this).parent().parent().removeClass('has-error');
            }
        });
        return invalidCount > 0 ? false : true;
    },
};

var Shared = {
    AddDropDownOption: function (checkboxClass, checkboxId, checkboxValue, spanValue, id, description) {
        var option = '<li data-keepOpenOnClick><a class="ddCkBx ' + checkboxClass + ' " id = "' + checkboxId + '" data-value = "' + checkboxValue + '" data-id = "' + id + '" data-ischecked="false">'
            + '<span hidden class="spnCheck" style="color: #6d94bf;" >&#10004;</span><span class="spnSpc">&nbsp;&nbsp;&nbsp;</span><span style="width:90%" class="dropdown-item-text" > ' + spanValue + '</span></a></li> ';
        return option;
    },

    AddDropDownButton: function (buttonId, buttonValue) {
        var button = '<li style="text-align:center"><input type = "button" class="btn btn-link " style = "border:none" id = "' + buttonId + '"  data-toggle="modal" data-target="#addModal" value = "--' + buttonValue + '--" /></li >';

        return button;
    },

    AddDropDownHeader: function (headerText) {
        var header = '<div class="dropdown-header" >' + headerText + '</div >';

        return header;
    },

    AddTableRow: function (i, productIdValue, productDesc, weight, cost, upc) {
        $('#tblProducts > tbody:last-child').append('<tr>'
            + '<td><input type="text" class="form-control txtProductId" id="txtProductId' + i + '" value="' + productIdValue + '" data-id="' + i + '" /></td > '
            + '<td><input type="text" class="form-control overflow-auto txtProductDesc" id="txtProductDesc' + i + '" value="' + productDesc + '" data-id="' + i + '" /></td > '
            + '<td> <div style="float:left;"><input type="text" class="form-control txtUPC" id="txtUPC' + i + '" data-id="' + i + '" value="' + upc + '" /></div></td>'
            + '<td><div style = "padding-top:10px " ><input type="checkbox" class="form-check ckNoUPC" title="No UPC found"  id="ckNoUPC' + i + '" data-id="' + i + '" /></div></td>'
            //+ '<td><input type="text"class="form-control txtVendorId" data-vendorid="0" id="txtVendorId' + i + '"  value="" /></td>'
            //+ '<td><input type="text"class="form-control txtVendorPartNo" id="txtVendorPartNo' + i + '"  value="" /></td>'
            + '<td>  <div id="divCost" class="input-group"><span class= "input-group-addon" > $</span><input type="number" class="form-control txtCost" min="0" id="txtCost' + i + '" value="' + cost + '" /> </div ></td>'
            + '<td><div class="input-group"><input type="number" min="0" class="form-control txtWeight" id="txtWeight' + i + '" value="' + weight + '" />' + Shared.AddUOMDD("Weight" + i, "W") + '</div ></td>'
            + '<td><div class="input-group"><input type="number" min="0" class="form-control txtLength" id="txtLength' + i + '"  value="" />' + Shared.AddUOMDD("Length" + i, "L") + '</div ></td>'
            + '<td><div class="input-group"><input type="number" min="0" class="form-control txtWidth" id="txtWidth' + i + '" value="" />' + Shared.AddUOMDD("Width" + i, "L") + '</div ></td>'
            + '<td><div class="input-group">'
            + '<input type = "number" min="0" class= "form-control txtHeight" id = "txtHeight' + i + '" value = "" />' + Shared.AddUOMDD("Height" + i, "L") + '</div ></td>'
            + '</tr >');



    },

    AddUOMDD: function (i, uomType) {
        var dd = '<div class="input-group-btn">'
            + '  <button type="button" class="dropdown-toggle form-control" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
            + '<span class="spnUOMSelected' + i.replace(/[0-9]/g, '') + '"  id="spnUOMSelected' + i + '" ><span class="caret" ></span></span></button > '
            + '<ul class="dropdown-menu dropdown-menu-right ddmUOMCategory" id="ddmUOMCategory' + i + '" data-productid="' + i + '" data-uomtype="' + uomType + '" style="text-align:center">'
            + '</ul> </div>';
        return dd;
    },

    AddUOMddOption: function (value, description, id, productId, isModal) {
        var li = '<li class="liUOM" id="liUOM' + id + '" value="' + id + '" title="' + description + '" data-productid="' + productId + '"data-ismodal="' + isModal + '">' + value + '</li>'
        return li;
    },

    IsLetter: function (c) {
        return c.toLowerCase() != c.toUpperCase();
    },
    AddSiblingsTableRow: function (i, itemNo, desc, vendNo) {
        $('#tblSiblingItems > tbody:last-child').append('<tr>'
            + '<td align="right"><input type="checkbox" class="ckAddSibling" id="ckAddSibling"' + i + ' /></td>'
            + '<td><span id="spnSiblingItemNo' + i + '" class="spnSiblingItemNo">' + itemNo + '</span></td>'
            + '<td><span id="spnSiblingItemDesc' + i + '" class="spnSiblingItemDesc">' + desc + '</span></td>'
            + '<td><span id="spnSiblingItemVendNo' + i + '" class="spnSiblingItemDesc">' + vendNo + '</span></td>'
            + '</tr >');
    },
    AddNoRecordsRow: function () {
        $('#tblSiblingItems > tbody:last-child').append('<tr class="no - trNoRecords" id="trNoRecords">'
            + '<td colspan="4">No record found</td>'
            + '</tr>');
    },
    AddEditRow: function () {
        $('#tblSiblingItems tr:first').after('<tr class=trEditRow><td align = "right" > '
            + '<button class="btn-sm btn-primary btnAddAddtnlSibling" title="" id="btnAddAddtnlSibling" >&#10004</button> &nbsp;'
            + '<button class= "btn-sm btn-primary btnCancelSibling"  title = "" id = "btnCancelSibling" >&#10006</button >'
            + '</td>'
            + '<td><input type="text" id="txtAdditionalSibling" class="form-control" /></td>'
            + '<td></td></tr >');
    },
    ScrollSmoothToBottom: function (id) {
        var div = document.getElementById(id);
        $('#' + id).animate({
            scrollTop: div.scrollHeight - div.clientHeight
        }, 500);
    },
    ScrollSmoothToTop: function (id) {
        var div = document.getElementById(id);
        $('#' + id).animate({
            scrollTop: 0
        }, 500);
    },
};
