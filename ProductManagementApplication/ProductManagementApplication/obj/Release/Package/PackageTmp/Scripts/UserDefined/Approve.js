$(document).ready(function () {

    INIT.LoadUnapprovedProducts().done(function () {
        $('#divWrapTable').after('<ul id="navPage" class="pagination"></ul>');
        var rowsShown = 6;
        var rowsTotal = $('#tblApproveProducts tbody tr').length;
        rowsTotal = rowsTotal - 1;
        var numPages = rowsTotal == 0 ? 1 : rowsTotal / rowsShown;
        
        $('#tblApproveProducts tbody tr').hide();
        $('#tblApproveProducts tbody tr').slice(0, rowsShown).show();

        $('#navPage').twbsPagination({
            totalPages: numPages,
            visiblePages: 5,
            onPageClick: function (event, page) {
                var startItem = page * rowsShown;
                var endItem = startItem + rowsShown;
                $('#tblApproveProducts tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({ opacity: 1 }, 300);
            }
        });
    });


    $(document).on('click', ".btnApprove", function () {
        var productId = this.dataset.productid;
        var classDesc = this.dataset.classDesc;
        var isStbChannel = $("#ckStChnl" + productId).is(':checked');
        var isStbWebsite = $("#ckStWeb" + productId).is(':checked');
        SAVE.ApproveProduct(productId, classDesc, isStbChannel, isStbWebsite);

    });
    $(document).on('click', ".btnDisapprove", function () {
        var productId = this.dataset.productid;
        var productSku = this.dataset.productsku;
        $("#spnDisPrdSku").text(productSku);
        $("#spnDisPrdId").text(productId);
    
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
        
    })
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

};

var SAVE = {
    ApproveProduct: function (productId, classDesc,isStbChannel, isStbWebsite) {
        $.ajax({
            type: "POST",
            url: "../Approve/ApproveProduct",
            data: "&productId=" + productId + "&classDesc=" + classDesc + "&isStbChannel=" + isStbChannel + "&isStbWebsite=" + isStbWebsite,
            success: function (res) {
                if (res.result != "success") {
                    alert("Error while approving product: \n" + res.result);
                }
                else {
                    alert("Product was successfully approved and entered into AccountMate. \n Please note no changes were made in AM since this feature is still in middle of development.");
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
            data: "&productId=" + productId + "&disReason=" + disReason,
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
}

var SHARED = {
    AddTableRow: function (product) {
        var row = '<tr>'
            + '<td> <button class="btn-sm btn-primary btnApprove" title="Approve" id="btnApprove' + product.ProductId + '" data-productid="' + product.ProductId + '" data-classdesc="' + product.ClassDescription + '">&#10004</button></td>'
            + '<td> <button class="btn-sm btn-primary btnDisapprove"  data-toggle="modal" data-target="#disapproveModal" title="Disapprove" id="btnDisapprove' + product.ProductId + '" data-productid="' + product.ProductId + '" data-productsku="' + product.ProductSku + '" >&#10006</button></td>'
            + '<td><span class="spnPrdId" id="spnPrdId' + product.ProductId + '">' + product.ProductSku + '</span></td>'
            + '<td><span class="spnDesc" id="spnDesc' + product.ProductId + '">' + product.ProductDescription + '</span></td>'
            + '<td><span class="spnSupplier" id="spnSupplier' + product.ProductId + '">' + product.SupplierDescription + '</span></td>'
            + '<td><span class="spnBrand" id="spnBrand' + product.ProductId + '">' + product.BrandDescription + '</span></td>'
            + '<td><span class="spnClass" id="spnClass' + product.ProductId + '">' + product.ClassDescription + '</span></td>'
            + '<td><span class="spnType" id="spnType' + product.ProductId + '">' + product.TypeDescription + '</span></td>'
            + '<td><span class="spnUPC" id="spnUPC' + product.ProductId + '">' + product.UPC + '</span></td>'
            + '<td><span class="spnVendorId" id="spnVendorId' + product.ProductId + '">' + product.VendorId + '</span></td>'
            + '<td><span class="spnCost" id="spnCost' + product.ProductId + '">' + product.Cost + '</span></td>'
            + '<td><span class="spnWeight" id="spnWeight' + product.ProductId + '">' + product.WeightCombo + '</span></td>'
            + '<td><span class="spnLength" id="spnLength' + product.ProductId + '">' + product.LengthCombo + '</span></td>'
            + '<td><span class="spnWidth" id="spnWidth' + product.ProductId + '">' + product.WidthCombo + '</span></td>'
            + '<td><span class="spnHeight" id="spnHeight' + product.ProductId + '">' + product.HeightCombo + '</span></td>'
            + '<td style=" text-align:center"><span class="spnIsOneTime" id="spnIsOneTime' + product.ProductId + '">';

        row = product.IsOneTime ? row + '<input type="checkbox" disabled checked />' : row + '<input type="checkbox" disabled  />';
        row = row + '</span></td>'
            + '<td><span class="spnDateCreated" id="spnDateCreated' + product.ProductId + '">' + product.DateCreated + '</span></td>'
            + '<td><span class="spnCreatedBy" id="spnCreatedBy' + product.ProductId + '">' + product.CreatedBy + '</span></td>';
        row = row + '<td style=" text-align:center"><input type="checkbox" id="ckStChnl' + product.ProductId + '"   /></td><td style=" text-align:center"><input type="checkbox" id="ckStWeb' + product.ProductId + '"  /></td></tr >';
        $('#tblApproveProducts > tbody:last-child').append(row);


    },

};