using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ProductManagementApplication.Models.DTO
{

    public class ProductDTO
    {

        public Int64 ProductId { get; set; }
        public string ProductSku { get; set; }
        public string ProductIdPrefix { get; set; }
        public string ProductDescription { get; set; }
        public string BaseItemDescription { get; set; }
        public int SupplierId { get; set; }
        public string SupplierDescription { get; set; }
        public string BrandDescription { get; set; }
        public int BrandId { get; set; }
        public int ClassId1 { get; set; }
        public string ClassDescription1 { get; set; }
        public int ClassId2 { get; set; }
        public string ClassDescription2 { get; set; }
        public int ClassId3 { get; set; }
        public string ClassDescription3 { get; set; }
        public string TypeId { get; set; }
        public string TypeDescription { get; set; }
        public bool IsOneTime { get; set; }
        public string UPC { get; set; }
        public bool NoUPCFound { get; set; }
        public string VendorId { get; set; }
        public string VendorPartNo { get; set; }
        public decimal Cost { get; set; }
        public decimal Weight { get; set; }
        public int WeightUOMId { get; set; }
        public string WeightCombo { get; set; }
        public decimal Length { get; set; }
        public int LengthUOMId { get; set; }
        public string LengthCombo { get; set; }
        public decimal Width { get; set; }
        public int WidthUOMId { get; set; }
        public string WidthCombo { get; set; }
        public decimal Height { get; set; }
        public int HeightUOMId { get; set; }
        public string HeightCombo { get; set; }
        public bool IsSuitableChannels { get; set; }
        public bool IsSuitableWeb { get; set; }
        public List<int> ColorIdList { get; set; }
        public List<int> SizeIdList { get; set; }
        public List<int> OrientationIdList { get; set; }
        public List<int> FlavorIdList { get; set; }
        public List<int> PackagingIdList { get; set; }
        public List<int> UOMIdList { get; set; }
        public List<int> StrengthIdList { get; set; }
        public List<int> GenderIdList { get; set; }
        public List<int> OtherIdList { get; set; }
        public string DateCreated { get; set; }
        public string CreatedBy { get; set; }
        public string DateUpdated { get; set; }
        public string UpdatedBy { get; set; }
        public string AssociatedProduct { get; set; }
        //public ProductDTO()
        //{
        //    this.AssociatedProductList = new List<string>();
        //}

    }

    public class SizeHeaderDTO
    {
        public string SizeTitle { get; set; }
        public int SizeTitleId { get; set; }
        public List<SizeDetailDTO> SizeList { get; set; }
        public SizeHeaderDTO()
        {
            this.SizeList = new List<SizeDetailDTO>();
        }
    }
    public class SizeDetailDTO
    {
        public int SizeId { get; set; }
        public string SizeDescription { get; set; }

    }

    public class SupplierDTO{
        public int SupplierId { get; set; }
        public string SupplierDescription { get; set; }
    }
    public class BrandDTO
    {
        public int BrandId { get; set; }
        public string BrandDescription { get; set; }
    }
    public class ClassDTO
    {
        public Int64 ClassId { get; set; }
        public string ClassDescription { get; set; }
        public string ClassCode { get; set; }
    }
    public class ClassHierarchyDTO
    {
        public Int64 ClassHierarchyId { get; set; }
        public Int64 RevNo { get; set; }

        public string Description { get; set; }
        public List<ClassHierarchyDTO> ClassChildren { get; set; }
        public ClassHierarchyDTO()
        {
            this.ClassChildren = new List<ClassHierarchyDTO>();
        }
    }
    public class UnitOfMeasureCategoryDTO
    {
        public int UOMCategoryId { get; set; }
        public string UOMDescription { get; set; }
        public string UOMCode { get; set; }
        public string UOMType { get; set; }
    }
    public class ResetPasswordConfirmModel
    {

        public string Token { get; set; }

      
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }


        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

}