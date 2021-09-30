$(document).ready(function () {

    window.userId = $("#spnUserId").text();

    window.ProductList = [];

    window.ProductId = 0;

    INIT.LoadProductIds();

    INIT.LoadSuppliers();
    window.supplierDescription = "";
    window.supplierId = 0;

    INIT.LoadBrands();
    window.brandList = [];
    window.brandDescription = "";
    window.brandId = 0;

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

    INIT.LoadVendors();
    window.vendorList = [];
    window.vendorId = 0;
    window.vendorCode = "";
    window.vendorPartNo = "";

    INIT.LoadUOMCategories();
    window.uomCategories = [];

    $(".hideInit").hide();

    $("#txtSrchProduct").autocomplete({
        minLength: 0,
        autoFocus: true,

        source: function (request, response) {
            window.ProductId = 0;
            response($.map(window.ProductList, function (obj, key) {

                var ProductSku = obj.ProductSku.toUpperCase();

                if (ProductSku.indexOf(request.term.toUpperCase()) != -1) {
                    return {
                        label: obj.ProductSku.toUpperCase(), // Label for Display
                        value: obj.ProductId,
                        data: obj.ProductId, // Value
                    }
                } else {
                    return null;
                }
            }));
        },



        select: function (event, ui) {
            event.preventDefault();
            INIT.HideInputFields();
            Shared.ClearForm();
            $('#txtSrchProduct').val(ui.item.label);
            window.ProductId = ui.item.data;
            // ... any other tasks (like setting Hidden Fields) go here...
            INIT.LoadProductDetails(window.ProductId);
        }
    }).focus(function () {
        $(this).autocomplete("search", "");
    });

    $(".closeInput").click(function () {
        var spanValue = $(this).parents(".divRowParent").find(".spnText").text();
        if (spanValue != "") {
            $(this).parents(".divRowParent").find(".addNew").hide()
            $(this).parents(".divRowParent").find(".editDiv").hide();
            $(this).parents(".divRowParent").find(".spnText").show();
        }
        else {

            $(this).parents(".divRowParent").find(".addNew").show()
            $(this).parents(".divRowParent").find(".editDiv").hide();
            $(this).parents(".divRowParent").find(".spnText").hide();
        }
        $(this).hide();

    });

    $(".addNew").click(function () {
        $(this).parents(".divRowParent").find(".editDiv").show();
        $(this).parents(".divRowParent").find(".closeInput").show();
        $(this).parents(".divRowParent").find(".showInit").hide();
        $(this).hide();
    });

    //Manufacturer
    $("#spnManufacturer").click(function () {
        $("#divEditManufacturer").show();
        $("#spnManfEditClose").show();
        $(this).hide();
    });

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

    //Brand
    //$("#spnBrand").click(function () {
    //    $("#divEditBrand").show();
    //    $("#spnBrandEditClose").show();
    //    $(this).hide();
    //});

    //Class
    //$("#spnCtgry1").click(function () {
    //    $("#divEditCtgry1").show();
    //    $("#spnCtgry1EditClose").show();
    //    $(this).hide();
    //});

    //$("#spnCtgry2").click(function () {
    //    $("#divEditCtgry2").show();
    //    $("#spnCtgry2EditClose").show();
    //    $(this).hide();
    //});

    //$("#spnCtgry3").click(function () {
    //    $("#divEditCtgry3").show();
    //    $("#spnCtgry3EditClose").show();
    //    $(this).hide();
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

    //type
    $("#spnType").click(function () {
        $("#divEditType").show();
        $("#spnTypeEditClose").show();
        $(this).hide();
    });

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

    //UPC
    $("#spnUPC").click(function () {
        $("#divEditUPC").show();
        $("#spnUPCEditClose").show();
        $(this).hide();
    });


    //Vendor
    $("#spnVendor").click(function () {
        $("#divEditVendor").show();
        $("#spnVendorEditClose").show();
        $(this).hide();
    });

    $(document).on('click', "#ckNoUPC", function () {
        var checked = $(this).is(':checked');
        if (checked) {

            $("#txtNewUPC").val("");
            $("#txtNewUPC").prop("disabled", true);
        }
        else {
            $("#txtNewUPC").prop("disabled", false);
        }
    });

    //Cost
    $("#spnCost").click(function () {
        $("#divEditCost").show();
        $("#spnCostEditClose").show();
        $(this).hide();
    });

    $(document).on('click', ".liUOM", function () {
        var textValue = $(this).text();
        var idValue = $(this).val();
        var productId = this.dataset.productid;
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
    });

    //Weight
    $("#spnWeight").click(function () {
        $("#divEditWeight").show();
        $("#spnWeightEditClose").show();
        $(this).hide();
    });

    //Length
    $("#spnLength").click(function () {
        $("#divEditLength").show();
        $("#spnLengthEditClose").show();
        $(this).hide();
    });

    //Height
    $("#spnHeight").click(function () {
        $("#divEditHeight").show();
        $("#spnHeightEditClose").show();
        $(this).hide();
    });

    //Width
    $("#spnWidth").click(function () {
        $("#divEditWidth").show();
        $("#spnWidthEditClose").show();
        $(this).hide();
    });

    $("#btnSaveChanges").click(function () {
        var isValid = SAVE.ValidateProductData();
        if (isValid) {
            var productData = SAVE.CollectProductData();
            SAVE.SaveProductChanges(productData);
        }

    });
});

var INIT = {
    LoadProductIds: function () {
        $.ajax({
            type: "POST",
            url: "../Manage/GetProductIdList",
            data: {},
            success: function (res) {
                if (res.productIdList.length > 0) {


                    for (var i = 0; i < res.productIdList.length; i++) {
                        window.ProductList.push(res.productIdList[i]);


                    }
                }
                else {
                    alert("Error while loading Product List");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    LoadProductDetails(productId) {
        var product = window.ProductList.find(x => x.ProductId == productId);
        if (product != "undefined") {
            $("#productDetails").show();
            $("#divSaveChanges").show();
            $("#spnPrdSku").text(product.ProductSku.toUpperCase() + " : ");
            $("#spnPrdDesc").text(product.ProductDescription);
            $("#spnAssProduct").text(product.AssociatedProduct);
            //$("#spnManufacturer").text(product.SupplierDescription);
            //window.supplierDescription = product.SupplierDescription;
            //window.supplierId = product.SupplierId;
            if (product.SupplierDescription != "") {

                $("#lblSupplier").text(product.SupplierDescription);
                $("#ckSup" + product.SupplierId).find(".spnCheck").show();
                $("#ckSup" + product.SupplierId).find(".spnSpc").hide();

                $("#ckSup" + product.SupplierId).attr('data-ischecked', "true");
                window.supplierId = product.SupplierId;
                window.supplierDescription = product.SupplierDescription;

            }
            else {
                $("#lblSupplier").text("Select one");
            }

            //  $("#spnBrand").text(product.BrandDescription);
            $("#txtBrand").val(product.BrandDescription);
            window.brandDescription = product.BrandDescription;
            window.brandId = product.BrandId;
            // $("#spnCtgry1").text(product.ClassDescription1);
            $("#lblClass1").text(product.ClassDescription1);
            window.classDescription1 = product.ClassDescription1;
            window.classId1 = product.ClassId1;
            if (product.ClassDescription2 != "") {
                // $("#spnCtgry2").text(product.ClassDescription2);
                $("#lblClass2").text(product.ClassDescription2);
                window.classDescription2 = product.ClassDescription2;
                window.classId2 = product.ClassId2;
            }
            else {
                $("#lblClass2").text("Select one");
                // $("#btnAddNewCategory2").show();
                // $("#spnCtgry2").hide();
            }
            if (product.ClassDescription3 != "") {
                $("#lblClass3").text(product.ClassDescription3);
                window.classDescription3 = product.ClassDescription3;
                window.classId3 = product.ClassId3;
            }
            else {
                $("#lblClass3").text("Select one");
                //  $("#btnAddNewCategory3").show();
                //$("#spnCtgry3").hide();
            }
            $("#lblType").text(product.TypeDescription);
            window.typeDescription = product.TypeDescription;
            window.typeId = product.TypeId;

            $("#ckNoUPC").prop('checked', product.NoUPCFound);
            if (!product.NoUPCFound) {
                $("#txtNewUPC").val(product.UPC);

            }
            // $("#spnUPC").text(product.UPC);
            window.upc = product.UPC;
            window.noUPCFound = product.NoUPCFound;

            if (product.VendorId != "") {

                $("#txtVendorId").val(product.VendorId);
                // $("#spnVendor").text(product.VendorId);
                window.vendorId = product.VendorId;
            }
            else {
                // $("#btnAddNewVendor").show();
                //  $("#spnVendor").hide();
            }

            $("#txtVendorPartNo").val(product.VendorPartNo);
               window.vendorPartNo = product.VendorPartNo;

            $("#txtCost").val(product.Cost);
            //   $("#spnCost").text(product.Cost);
            window.cost = product.Cost;
            $("#txtWeight").val(product.Weight);
            $("#spnUOMSelectedWeight").text(product.WeightCombo);
            $("#spnUOMSelectedWeight").attr("data-value", product.WeightUOMId);
            window.weight = product.Weight;
            window.weightUOMId = product.WeightUOMId;

            //$("#spnLength").text(product.LengthCombo);
            $("#txtLength").val(product.Length);
            $("#spnUOMSelectedLength").text(product.LengthCombo);
            $("#spnUOMSelectedLength").attr("data-value", product.LengthUOMId);
            window.length = product.Length;
            window.lengthUOMId = product.LengthUOMId;

            $("#txtWidth").val(product.Width);
            $("#spnUOMSelectedWidth").text(product.WidthCombo);
            $("#spnUOMSelectedWidth").attr("data-value", product.WidthUOMId);
            // $("#spnWidth").text(product.WidthCombo);
            window.width = product.Width;
            window.widthUOMId = product.WidthUOMId;

            $("#txtHeight").val(product.Height);
            $("#spnUOMSelectedHeight").text(product.HeightCombo);
            $("#spnUOMSelectedHeight").attr("data-value", product.HeightUOMId);
            // $("#spnHeight").text(product.HeightCombo);
            window.height = product.Height;
            window.heightUOMId = product.HeightUOMId;
            $("#ckOneTimePrd").prop('checked', product.IsOneTime);
            $("#ckStChn").prop('checked', product.IsSuitableChannels);
            $("#ckStWeb").prop('checked', product.IsSuitableWeb);
        }
        else {
            $("#productDetails").hide();
            alert("Error occurred while loading product details.");
        }
    },


    HideInputFields() {
        $(".hideInit").hide();
        $(".showInit").show();
    },

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
                        //var _this = $("#txtBrand"),
                        //    _data = _this.data(),
                        //    _hidden_field = $('#' + _data.hidden_field_id);

                        $("#txtBrand").autocomplete({
                            minLength: 1,
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

    LoadVendors: function () {
        $.ajax({
            type: "POST",
            url: "../Add/GetVendors",
            data: {},
            success: function (res) {
                if (res.vendorList.length > 0) {


                    for (var i = 0; i < res.vendorList.length; i++) {
                        window.vendorList.push(res.vendorList[i]);
                    }
                    $("#txtVendorId").autocomplete({
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
                    $('.ddmUOMCategory').each(function () {
                        var newUOMCatgList = window.uomCategories.filter(x => x.UOMType === this.dataset.uomtype);

                        for (var j = 0; j < newUOMCatgList.length; j++) {

                            $(this).append(Shared.AddUOMddOption(newUOMCatgList[j].UOMCode, newUOMCatgList[j].UOMDescription, newUOMCatgList[j].UOMCategoryId, this.dataset.productid, false))
                        }
                    });
                } else {
                    alert("Error while loading UOM Categories.");
                }


            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },
};

var SAVE = {
    ValidateProductData: function () {
        var invalidCount = 0;

        if ($("#txtBrand").val() == "") { $("#divBrand").addClass('has-error'); invalidCount++; }
        else { $("#divBrand").removeClass('has-error'); }

        if ($("#lblClass1").text() == "Select one") { $("#divClass1").addClass('has-error'); invalidCount++; }
        else { $("#divClass1").removeClass('has-error'); }

        if ($("#lblType").text() == "Select one") { $("#divType").addClass('has-error'); invalidCount++; }
        else { $("#divType").removeClass('has-error'); }

        $('.txtVendorId').each(function () {
            // invalidCount = invalidCount + PRD.CheckValue(this);
            var isFromDD = this.dataset.vendorid == "0" && this.value != "" ? true : false;
            if (isFromDD) {
                invalidCount = invalidCount + 1;
                alert("Please select a valid Vendor Id from the list. \nPlease contact system admin to add a new Vendor.")
            }
        });

        var checked = $("#ckNoUPC").is(':checked');

        if ($("#txtNewUPC").val() == "" && !checked) { $("#divUPC").addClass('has-error'); invalidCount++; }
        else { $("#divUPC").removeClass('has-error'); }

        if ($("#txtCost").val() == "") { $("#divCost").addClass('has-error'); invalidCount++; }
        else { $("#divCost").removeClass('has-error'); }

        if ($("#txtLength").val() == "" || $("#spnUOMSelectedLength").text() == "") { $("#divLength").addClass('has-error'); invalidCount++; }
        else { $("#divLength").removeClass('has-error'); }

        if ($("#txtWidth").val() == "" || $("#spnUOMSelectedWidth").text() == "") { $("#divWidth").addClass('has-error'); invalidCount++; }
        else { $("#divWidth").removeClass('has-error'); }

        if ($("#txtWeight").val() == "" || $("#spnUOMSelectedWeight").text() == "") { $("#divWeight").addClass('has-error'); invalidCount++; }
        else { $("#divWeight").removeClass('has-error'); }

        if ($("#txtHeight").val() == "" || $("#spnUOMSelectedHeight").text() == "") { $("#divHeight").addClass('has-error'); invalidCount++; }
        else { $("#divHeight").removeClass('has-error'); }

        var isValid = invalidCount > 0 ? false : true;

        return isValid;
    },

    CollectProductData: function () {
        var product = window.ProductList.find(x => x.ProductId == window.ProductId);
        if (product != "undefined") {
            product.SupplierId = window.supplierId;
            product.SupplierDescription = window.supplierDescription;
            product.Brand = window.brandDescription;
            product.BrandId = window.brandId;
            product.ClassId1 = window.classId1;
            product.ClassDescription1 = window.classDescription1;
            product.ClassId2 = window.classId2;
            product.ClassDescription2 = window.classDescription2;
            product.ClassId3 = window.classId3;
            product.ClassDescription3 = window.classDescription3;
            product.TypeId = window.typeId;
            product.TypeDescription = window.typeDescription;
            product.UPC = $("#txtNewUPC").val();
            product.NoUPCFound = $("#ckNoUPC").is(':checked');
            product.VendorId = $("#txtVendorId").val();
            product.VendorPartNo = $("#txtVendorPartNo").val();
            product.Cost = $("#txtCost").val();
            product.Weight = $("#txtWeight").val();
            product.WeightUOMId = $("#spnUOMSelectedWeight").attr("data-value");
            product.Length = $("#txtLength").val();
            product.LengthUOMId = $("#spnUOMSelectedLength").attr("data-value");
            product.Width = $("#txtWidth").val();
            product.WidthUOMId = $("#spnUOMSelectedWidth").attr("data-value");
            product.Height = $("#txtHeight").val();
            product.HeightUOMId = $("#spnUOMSelectedHeight").attr("data-value");
            product.IsOneTime = $("#ckOneTimePrd").is(':checked');
            product.IsSuitableChannels = $("#ckStChn").is(':checked');
            product.IsSuitableWeb = $("#ckStWeb").is(':checked');
            product.UpdatedBy = window.userId;
            return product;
        }
    },

    SaveProductChanges: function (productData) {
        $.ajax({
            type: "POST",
            url: "../Manage/SaveProducts",
            data: "&productData=" + encodeURIComponent(JSON.stringify(productData)),
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while updating product: \n" + res.result);
                }
                else {
                    alert("Product was successfully updated! \nPlease note, product will not appear in AccountMate until it is approved.");
                    location.reload();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });

    },
};

var Shared = {
    ClearForm: function () {
        $("#productDetails").find("input:text").val("");
        $("#productDetails").find("input[type='number']").val("");
        //   $("#" + div + "").find("textarea").val("");
        $("#productDetails input[type='checkbox']").prop("checked", false);
        $("#productDetails").find(".validation").removeClass("validation");
        $("#productDetails").find(".spnLabel").text("Select one");
        $("#productDetails").find(".spnUOM").html('<span class="caret"></span>');
        $("#productDetails").find(".has-error").each(function () { $(this).removeClass("has-error"); });
        $("#productDetails").find(".spnCheck").hide();
        $("#productDetails").find(".spnSpc").show();

        window.supplierDescription = "";
        window.supplierId = 0;

        window.brandDescription = "";
        window.brandId = 0;

        window.classDescription1 = "";
        window.classId1 = 0;

        window.classDescription2 = "";
        window.classId2 = 0;

        window.classDescription3 = "";
        window.classId3 = 0;

        window.typeDescription = "";
        window.typeId = "";

        window.vendorId = 0;
        window.vendorCode = "";
        window.vendorPartNo = 0;
       
    },

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

};