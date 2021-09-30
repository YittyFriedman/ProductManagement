$(document).ready(function () {

    window.userId = $("#spnUserId").text();

    window.productList = [];

    INIT.LoadSuppliers();
    window.supplierDescription = "";
    window.supplierId = 0;
    window.supplierList = [];

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
    window.typeList = [];

    //  INIT.LoadVendors();
    window.vendorList = [];
    window.vendorId = 0;
    window.vendorCode = "";
    window.vendorPartNo = "";

    INIT.LoadUOMCategories();
    window.uomCategories = [];

    INIT.LoadUnapprovedProducts().done(function () {
        $('#divWrapTable').after('<ul id="navPage" class="pagination"></ul>');
        var rowsShown = 6;
        var rowsTotal = $('#tblApproveProducts tbody tr').length;
        //var tempRowsTotal = rowsTotal - 1;
        var numPages = rowsTotal == 0 ? 1 : rowsTotal / rowsShown;
        numPages = Math.ceil(numPages);
        $('#tblApproveProducts tbody tr').hide();
        $('#tblApproveProducts tbody tr').slice(0, rowsShown).show();

        $('#navPage').twbsPagination({
            initiateStartPageClick: false,
            totalPages: numPages,
            visiblePages: 5,
            onPageClick: function (event, page) {
                page = page - 1;
                var startItem = page * rowsShown;
                var endItem = startItem + rowsShown;
                $('#tblApproveProducts tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({ opacity: 1 }, 300);
            }
        });
    });

    $(document).on('click', ".btnApprove", function () {
        var productId = this.dataset.productid;
        // var classid = this.dataset.classid;
        var isStbChannel = $("#ckStChnl" + productId).is(':checked');
        var isStbWebsite = $("#ckStWeb" + productId).is(':checked');
        var hasAssPrd = this.dataset.hasassprd;
        SAVE.ApproveProduct(productId, isStbChannel, isStbWebsite, hasAssPrd);

    });

    $(document).on('click', ".btnDisapprove", function () {
        var productId = this.dataset.productid;
        var productSku = this.dataset.productsku;
        $("#spnDisPrdSku").text(productSku);
        $("#spnDisPrdId").text(productId);

    });

    $(document).on('click', ".btnEdit", function () {
        $('#editPrdModal').modal('toggle')
        var productId = this.dataset.productid;
        INIT.LoadProductDetails(productId);
        INIT.LoadBrands();
        INIT.LoadVendors();
        
        //  $("#productDetails").show();
        //var productSku = this.dataset.productsku;
        //$("#spnDisPrdSku").text(productSku);
        //$("#spnDisPrdId").text(productId);

    });

    $(document).on('click', ".btnDisItem", function () {
        var productId = $("#spnDisPrdId").text();
        var disReason = $("#txtDisReason").val();
        if (disReason != "") {
            SAVE.DisapproveProduct(productId, disReason);
        }
        else {
            alert("Please enter a disapproval reason.");
        }


    });

    $('#disapproveModal').on('show.bs.modal', function (event) {
        $(this).find("input:text").val("");

    });

    $(document).on('click', ".aPrdId", function () {
        $('#viewPrdModal').modal('toggle')
        var productId = this.dataset.productid;
        window.productId = productId;
        PRD.ViewProductDetails(productId);

    });

    $("#btnEditProduct").click(function () {
        $('#viewPrdModal').modal('hide');
        $('#editPrdModal').modal('show');
        
        INIT.LoadProductDetails(window.productId);
        INIT.LoadBrands();
        INIT.LoadVendors();


    });

    $("#btnSaveChanges").click(function () {
        var isValid = SAVE.ValidateProductData();
        if (isValid) {
            var productData = SAVE.CollectProductData(productSku);
            SAVE.SaveProductChanges(productData);
        }
       // $('#editPrdModal').modal('hide');
       // $('#viewPrdModal').modal('show');
       

    });

    //*************from manage.js for editing functionality*********************/
    $(".hideInit").hide();

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

  
  
});

var INIT = {
    LoadUnapprovedProducts: function () {
        return $.ajax({
            type: "POST",
            url: "../Approve/GetUnapprovedProducts",
            data: {},
            success: function (res) {

                if (res.productList.length > 0) {


                    for (var i = 0; i < res.productList.length; i++) {
                        var product = res.productList[i];
                        window.productList.push(product);
                        SHARED.AddTableRow(product, i);
                    }
                }
                else {
                    alert("Error while loading product list.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    //LoadAssociatedProducts: function (itemNo) {
    //    return $.ajax({
    //        type: "POST",
    //        url: "../Approve/GetAssociatedProducts",
    //        data: "&itemNo=" + itemNo,
    //        success: function (res) {
    //            $("#listAssPrd").empty();
    //            if (res.productList.length > 0) {


    //                for (var i = 0; i < res.productList.length; i++) {
    //                    $("#listAssPrd").append("<li>" + res.productList[i] + "</li>");
    //                }
    //            }
    //            else {
    //                $("#listAssPrd").append("<li>No associated products found.</li>");
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            alert(error);
    //        },
    //    });
    //},

    LoadProductDetails(productId) {
        SHARED.ClearForm();



        var product = window.productList.find(x => x.ProductId == productId);
        if (product != "undefined") {
            $("#productDetails").show();
            $("#divSaveChanges").show();
            $("#spnPrdSku").text(product.ProductSku.toUpperCase() + " : ");
            window.productSku = product.ProductSku;
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
            $("#txtBrandEdit").val(product.BrandDescription);
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

            $("#ckNoUPCEdit").prop('checked', product.NoUPCFound);
            if (!product.NoUPCFound) {
                $("#txtNewUPCEdit").val(product.UPC);

            }
            // $("#spnUPC").text(product.UPC);
            window.upc = product.UPC;
            window.noUPCFound = product.NoUPCFound;

            if (product.VendorId != "") {

                $("#txtVendorIdEdit").val(product.VendorId);
                $("#txtVendorIdEdit").attr("data-vendorid", product.VendorId);
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

            var weight = product.WeightCombo.split(" ")[0];
            var weightUnit = product.WeightCombo.split(" ")[1];
            $("#txtWeight").val(weight);
            $("#spnUOMSelectedWeight").text(weightUnit);
            $("#spnUOMSelectedWeight").attr("data-value", product.WeightUOMId);
            window.weight = weight;
            window.weightUOMId = product.WeightUOMId;

            //$("#spnLength").text(product.LengthCombo);
            var length = product.LengthCombo.split(" ")[0];
            var lengthUnit = product.LengthCombo.split(" ")[1];
            $("#txtLength").val(length);
            $("#spnUOMSelectedLength").text(lengthUnit);
            $("#spnUOMSelectedLength").attr("data-value", product.LengthUOMId);
            window.length = length;
            window.lengthUOMId = product.LengthUOMId;

            var width = product.WidthCombo.split(" ")[0];
            var widthUnit = product.WidthCombo.split(" ")[1];
            $("#txtWidth").val(width);
            $("#spnUOMSelectedWidth").text(widthUnit);
            $("#spnUOMSelectedWidth").attr("data-value", product.WidthUOMId);
            // $("#spnWidth").text(product.WidthCombo);
            window.width = width;
            window.widthUOMId = product.WidthUOMId;

            var height = product.HeightCombo.split(" ")[0];
            var heightUnit = product.HeightCombo.split(" ")[1];
            $("#txtHeight").val(height);
            $("#spnUOMSelectedHeight").text(heightUnit);
            $("#spnUOMSelectedHeight").attr("data-value", product.HeightUOMId);
            // $("#spnHeight").text(product.HeightCombo);
            window.height = height;
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
                        window.supplierList.push(res.supplierList[i]);


                        var checkBoxId = "ckSup" + res.supplierList[i].SupplierId;
                        var id = res.supplierList[i].SupplierId;
                        var checkBoxValue = res.supplierList[i].SupplierDescription;
                        var spanValue = res.supplierList[i].SupplierDescription;
                        var checkboxClass = "ckSupplier";
                        $('#ddmSupplier').append(SHARED.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
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


                        $("#txtBrandEdit").autocomplete({
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
                                $('#txtBrandEdit').val(ui.item.label);
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
                        window.typeList.push(res.typeList[i]);
                        var checkBoxId = "ckType" + res.typeList[i].ctype.trim();
                        var id = res.typeList[i].ctype.trim();
                        var checkBoxValue = res.typeList[i].ctypedesc.trim();
                        var spanValue = res.typeList[i].ctypedesc.trim();
                        var checkboxClass = "ckType";
                        $('#ddmType').append(SHARED.AddDropDownOption(checkboxClass, checkBoxId, checkBoxValue, spanValue, id));
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
                    $("#txtVendorIdEdit").autocomplete({
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

                            $(this).append(SHARED.AddUOMddOption(newUOMCatgList[j].UOMCode, newUOMCatgList[j].UOMDescription, newUOMCatgList[j].UOMCategoryId, this.dataset.productid, false))
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

var PRD = {
    ViewProductDetails: function (productId) {
        var product = window.productList.find(x => x.ProductId == productId);
        if (product != undefined) {
            $("#spnProductSku").text(product.ProductSku + " : ");
            $("#spnProductDesc").text(product.ProductDescription);
            $("#spnOldProduct").text(product.AssociatedProduct);
            $("#spnManufacturer").text(product.SupplierDescription);
            $("#spnBrand").text(product.BrandDescription);
            $("#spnCtgry1").text(product.ClassDescription1);
            $("#spnCtgry2").text(product.ClassDescription2);
            $("#spnCtgry3").text(product.ClassDescription3);
            $("#spnType").text(product.TypeDescription);
            // $("#ckNoUPC").prop('checked', product.NoUPCFound);
            $("#spnUPC").text(product.UPC);
            $("#spnVendor").text(product.VendorId);
            $("#spnVendorPartNo").text(product.VendorPartNo);
            $("#spnCost").text(product.Cost);
            $("#spnWeight").text(product.WeightCombo);
            $("#spnLength").text(product.LengthCombo);
            $("#spnWidth").text(product.WidthCombo);
            $("#spnHeight").text(product.HeightCombo);
            $("#ckOneTimePrdView").prop('checked', product.IsOneTimeProduct);
            $("#ckStChnView").prop('checked', product.IsSuitableChannels);
            $("#ckStWebView").prop('checked', product.IsSuitableWeb);
        }
        else {
            alert("Error occurred while loading product details.");
        }
    },
};

var SAVE = {
    ApproveProduct: function (productId, isStbChannel, isStbWebsite, hasAssPrd) {
        $.ajax({
            type: "POST",
            url: "../Approve/ApproveProduct",
            data: "&productId=" + productId + "&isStbChannel=" + isStbChannel + "&isStbWebsite=" + isStbWebsite + "&userId=" + window.userId,//"&classId=" + classid +
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while approving product: \n" + res.result);
                }
                else {
                    if (hasAssPrd == "true") {
                        alert("Product was successfully approved and entered into AccountMate. All associated products have been set to inactive in AM.");

                    }
                    else {
                        alert("Product was successfully approved and entered into AccountMate.");

                    }
                    location.reload();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });

    },

    DisapproveProduct: function (productId, disReason) {
        $.ajax({
            type: "POST",
            url: "../Approve/DisapproveProduct",
            data: "&productId=" + productId + "&disReason=" + disReason + "&userId=" + window.userId,
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while disapproving product: \n" + res.result);
                }
                else {
                    alert("Product was successfully disapproved.");
                    location.reload();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            },
        });
    },

    ValidateProductData: function () {
        var invalidCount = 0;

        if ($("#txtBrandEdit").val() == "") { $("#divBrand").addClass('has-error'); invalidCount++; }
        else { $("#divBrand").removeClass('has-error'); }

        if ($("#lblClass1").text() == "Select one") { $("#divClass1").addClass('has-error'); invalidCount++; }
        else { $("#divClass1").removeClass('has-error'); }

        if ($("#lblType").text() == "Select one") { $("#divType").addClass('has-error'); invalidCount++; }
        else { $("#divType").removeClass('has-error'); }

                $('.txtVendorIdEdit').each(function () {
         //invalidCount = invalidCount + PRD.CheckValue(this);
                  var isFromDD = this.dataset.vendorid == "0" && this.value != "" ? true : false;
                if (isFromDD) {
                  invalidCount = invalidCount + 1;
                alert("Please select a valid Vendor Id from the list. \nPlease contact system admin to add a new Vendor.")
          }
        });

        var checked = $("#ckNoUPCEdit").is(':checked');

        if ($("#txtNewUPCEdit").val() == "" && !checked) { $("#divUPC").addClass('has-error'); invalidCount++; }
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
        var product = window.productList.find(x => x.ProductSku == window.productSku);
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
            product.UPC = $("#txtNewUPCEdit").val();
            product.NoUPCFound = $("#ckNoUPCEdit").is(':checked');
            product.VendorId = $("#txtVendorIdEdit").val();
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
            product.IsOneTimeProduct = $("#ckOneTimePrd").is(':checked');
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
}

var SHARED = {
    AddTableRow: function (product) {
        var hasAssPrd = product.AssociatedProduct != "" ? true : false;
        var row = '<tr>'
            + '<td> <button class="btn-sm btn-primary btnApprove" title="Approve" id="btnApprove' + product.ProductId + '" data-productid="' + product.ProductId + '" data-classid="' + product.ClassId + '" data-hasassprd="' + hasAssPrd + '" >&#10004</button></td>'
            + '<td> <button class="btn-sm btn-primary btnDisapprove"  data-toggle="modal" data-target="#disapproveModal" title="Disapprove" id="btnDisapprove' + product.ProductId + '" data-productid="' + product.ProductId + '" data-productsku="' + product.ProductSku + '" >&#10006</button></td>'
            + '<td> <button class="btn-sm btn-primary btnEdit"  title="Edit" id="btnEdit' + product.ProductId + '" data-productid="' + product.ProductId + '">&#128393;</button></td>'
            + '<td style=" text-align:center">';
            row = product.IsSuitableChannels ? row + ' <input type = "checkbox" checked id = "ckStChnl' + product.ProductId + '" />' : row + ' <input type = "checkbox"  id = "ckStChnl' + product.ProductId + '" />';
            row = row + '</td> <td style=" text-align:center" > ';
            row = product.IsSuitableWeb ? row + ' <input type="checkbox" checked id="ckStWeb' + product.ProductId + '" />' : row + '<input type="checkbox"  id="ckStWeb' + product.ProductId + '" />';
            row = row + '</td> '
            + '<td><span class="spnPrdId" id="spnPrdId' + product.ProductId + '">' + product.AssociatedProduct + '</span></td>'
            + '<td><a class="aPrdId" id="aPrdId' + product.ProductId + '"  data-productid="' + product.ProductId + '" ><span class="spnPrdId" id="spnPrdId' + product.ProductId + '">' + product.ProductSku.toUpperCase() + '</span></a></td>'
            + '<td><span class="spnDesc" id="spnDesc' + product.ProductId + '">' + product.ProductDescription + '</span></td>'
            + '<td><span class="spnSupplier" id="spnSupplier' + product.ProductId + '">' + product.SupplierDescription + '</span></td>'
            + '<td><span class="spnBrand" id="spnBrand' + product.ProductId + '">' + product.BrandDescription + '</span></td>'
            + '<td><span class="spnClass1" id="spnClass1' + product.ProductId + '">' + product.ClassDescription1 + '</span></td>'// ('+product.ClassId1+')
            + '<td><span class="spnClass2" id="spnClass2' + product.ProductId + '">' + product.ClassDescription2 + '</span></td>'// (' + product.ClassId2 + ')
            + '<td><span class="spnClass3" id="spnClass3' + product.ProductId + '">' + product.ClassDescription3 + '</span></td>'// (' + product.ClassId3 + ')
            + '<td><span class="spnType" id="spnType' + product.ProductId + '">' + product.TypeDescription + '</span></td>'
            + '<td><span class="spnUPC" id="spnUPC' + product.ProductId + '">' + product.UPC + '</span></td>'
            + '<td><span class="spnVendorId" id="spnVendorId' + product.ProductId + '">' + product.VendorId + '</span></td>'
            + '<td><span class="spnVendorPartNo" id="spnVendorPartNo' + product.ProductId + '">' + product.VendorPartNo + '</span></td>'
            + '<td><span class="spnCost" id="spnCost' + product.ProductId + '"> $' + product.Cost + '</span></td>'
            + '<td><span class="spnWeight" id="spnWeight' + product.ProductId + '">' + product.WeightCombo + '</span></td>'
            + '<td><span class="spnLength" id="spnLength' + product.ProductId + '">' + product.LengthCombo + '</span></td>'
            + '<td><span class="spnWidth" id="spnWidth' + product.ProductId + '">' + product.WidthCombo + '</span></td>'
            + '<td><span class="spnHeight" id="spnHeight' + product.ProductId + '">' + product.HeightCombo + '</span></td>'
            + '<td style=" text-align:center"><span class="spnIsOneTime" id="spnIsOneTime' + product.ProductId + '">';

        row = product.IsOneTime ? row + '<input type="checkbox" disabled checked />' : row + '<input type="checkbox" disabled  />';
        row = row + '</span></td>'
            + '<td><span class="spnDateCreated" id="spnDateCreated' + product.ProductId + '">' + product.DateCreated + '</span></td>'
            + '<td><span class="spnCreatedBy" id="spnCreatedBy' + product.ProductId + '">' + product.CreatedBy + '</span></td>'
            + '<td><span class="spnDateUpdated" id="spnDateUpdated' + product.ProductId + '">' + product.DateUpdated + '</span></td>'
            + '<td><span class="spnUpdateedBy" id="spnUpdatedBy' + product.ProductId + '">' + product.UpdatedBy + '</span></td>';

        row = row + '</tr >';
        $('#tblApproveProducts > tbody:last-child').append(row);


    },

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