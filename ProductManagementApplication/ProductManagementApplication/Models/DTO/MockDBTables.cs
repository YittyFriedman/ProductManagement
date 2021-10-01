using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProductManagementApplication.Models;


namespace ProductManagementApplication.Models.DTO
{
    public class MockDBTables
    {

        public List<icitem> icitems { get; set; }
        public List<iciwh> iciwhs { get; set; }
        public List<ictype> ictypes { get; set; }
        public List<icvend> icvends { get; set; }
        public List<icitem_map> icitem_map { get; set; }
        public List<icunit> icunits { get; set; }
        public List<Supplier> Suppliers { get; set; }
        public List<Brand> Brands { get; set; }
        public List<Color> Colors { get; set; }
        public List<Type> Types { get; set; }
        public List<Orientation> Orientations { get; set; }
        public List<Size> Sizes { get; set; }
        public List<SizeTitle> SizeTitles { get; set; }
        public List<Product> Products { get; set; }
        public List<Gender> Genders { get; set; }
        public List<Other> Other { get; set; }
        public List<Vendor> Vendors { get; set; }
        public List<ClassHierarchy> ClassHierarchies { get; set; }
        public List<Flavor> Flavors { get; set; }
        public List<Packaging> Packagings { get; set; }
        public List<UnitOfMeasure> UnitOfMeasures { get; set; }
        public List<UnitOfMeasureCategory> UnitOfMeasureCategories { get; set; }
        public List<Strength> Strengths { get; set; }
        public List<UOMBase> UOMBases { get; set; }
        public List<ProductMapping> ProductMappings { get; set; }
      

        /// <summary>
        /// Function to Populate Mock Tables with Data 
        /// </summary>
        public MockDBTables()
        {
            icitems = new List<icitem>();

            iciwhs = new List<iciwh>();

            icvends = new List<icvend>();

            icitem_map = new List<icitem_map>();

            icunits = new List<icunit>();

            Products = new List<Product>();
            Products.Add(new Product
            {
                ProductId = 1,
                ProductSku = "TEST-4CHC61EA",
                ProductIdPrefix = "Test",
                ProductBaseDescription = "This is a test item",
                ProductDescription = "This is a test item; Chocolate , 1/Each",
                SupplierId = 1,
                BrandId = 1,
                Brand = "Brand 1",
                ClassId1 = 1,
                ClassId2 = 0,
                ClassId3 = 0,
                TypeId = "PAE",
                UPC = "123456",
                NoUPCFound = false,
                VendorId = "ABCD",
                VendorPartNo = "121212",
                Cost = 5,
                Weight = 2,
                WeightUOMId = 4,
                Length = 4,
                LengthUOMId = 1,
                Width = 6,
                WidthUOMId = 1,
                Height = 4,
                HeightUOMId = 1,
                UnitOfMeasureId = 1,
                IsOneTimeProduct = false,
                IsSuitableChannels = true,
                IsSuitableWeb = true,
                IsApproved = false,
                DateTimeCreated = DateTime.Now,
                CreatedBy = "user@gmail.com"
            });
            Products.Add(new Product
            {
                ProductId = 1,
                ProductSku = "TEST-4VNL61EA",
                ProductIdPrefix = "Test",
                ProductBaseDescription = "This is a test item",
                ProductDescription = "This is a test item; Vanilla , 1/Each",
                SupplierId = 1,
                BrandId = 1,
                Brand = "Brand 1",
                ClassId1 = 1,
                ClassId2 = 0,
                ClassId3 = 0,
                TypeId = "PAE",
                UPC = "333555",
                NoUPCFound = false,
                VendorId = "ABCD",
                VendorPartNo = "656565",
                Cost = 5,
                Weight = 2,
                WeightUOMId = 4,
                Length = 4,
                LengthUOMId = 1,
                Width = 6,
                WidthUOMId = 1,
                Height = 4,
                HeightUOMId = 1,
                UnitOfMeasureId = 1,
                IsOneTimeProduct = false,
                IsSuitableChannels = true,
                IsSuitableWeb = true,
                IsApproved = false,
                DateTimeCreated = DateTime.Now,
                CreatedBy = "user@gmail.com"
            });


            Suppliers = new List<Supplier>();

            Suppliers.Add(new Supplier { SupplierId = 1, SupplierDescription = "Manufacturer 1" });
            Suppliers.Add(new Supplier { SupplierId = 2, SupplierDescription = "Manufacturer 2" });


            Brands = new List<Brand>();
            Brands.Add(new Brand { BrandId = 1, BrandDescription = "Brand 1" });
            Brands.Add(new Brand { BrandId = 2, BrandDescription = "Brand 2" });

            Vendors = new List<Vendor>();
            Vendors.Add(new Vendor { VendorId = 1, VendorNo = "ABCD" });
            Vendors.Add(new Vendor { VendorId = 2, VendorNo = "EFGH" });

            ClassHierarchies = new List<ClassHierarchy>();
            ClassHierarchies.Add(new ClassHierarchy { ClassHierarchyId = 1, ClassHierarchyRevNo = 1, Level1 = "Supplies", Level2 = "Disposables", Level3 = "Gloves", Level4 = "" }); ;
            ClassHierarchies.Add(new ClassHierarchy { ClassHierarchyId = 2, ClassHierarchyRevNo = 2, Level1 = "Supplies", Level2 = "Disposables", Level3 = "Cups", Level4 = "" }); ;
            ClassHierarchies.Add(new ClassHierarchy { ClassHierarchyId = 3, ClassHierarchyRevNo = 3, Level1 = "Supplies", Level2 = "Disposables", Level3 = "Plates", Level4 = "" }); ;

            ictypes = new List<ictype>();
            ictypes.Add(new ictype { ctype = "PAE", ctypedesc = "Parts and Equipment", cstatus = "A" });
            ictypes.Add(new ictype { ctype = "SUP", ctypedesc = "Standard Supplies", cstatus = "A" });

            Colors = new List<Color>();
            Colors.Add(new Color { ColorCode = "RED", ColorDescription = "Red", ColorId = 1 });
            Colors.Add(new Color { ColorCode = "BLU", ColorDescription = "Blue", ColorId = 2 });

            Sizes = new List<Size>();
            Sizes.Add(new Size { SizeCode = "SML", SizeDescription = "Small", SizeId = 1, SizeTitleId = 1 });
            Sizes.Add(new Size { SizeCode = "MDM", SizeDescription = "Medium", SizeId = 2, SizeTitleId = 1 });

            SizeTitles = new List<SizeTitle>();
            SizeTitles.Add(new SizeTitle { SizeTitleDescription = "General", SizeTitleId = 1 });

            Orientations = new List<Orientation>();
            Orientations.Add(new Orientation { OrientationCode = "VRT", OrientationDescription = "Vertical", OrientationId = 1 });
            Orientations.Add(new Orientation { OrientationCode = "HRZ", OrientationDescription = "Horizontal", OrientationId = 2 });

            Flavors = new List<Flavor>();
            Flavors.Add(new Flavor { FlavorCode = "VNL", FlavorDescription = "Vanilla", FlavorId = 1 });
            Flavors.Add(new Flavor { FlavorCode = "CHC", FlavorDescription = "Chocolate", FlavorId = 2 });

            Packagings = new List<Packaging>();
            Packagings.Add(new Packaging { PackagingCode = "10U", PackagingDescription = "10 Units", PackagingId = 1 });
            Packagings.Add(new Packaging { PackagingCode = "24U", PackagingDescription = "24 Units", PackagingId = 2 });

            UnitOfMeasures = new List<UnitOfMeasure>();
            UnitOfMeasures.Add(new UnitOfMeasure { UnitOfMeasureId = 1, BaseCode = "Box", Factor = "10", UnitOfMeasureCode = "10B", UnitOfMeasureDescription = "10 Box" });

            Strengths = new List<Strength>();
            Strengths.Add(new Strength { StrengthCode = "1KM", StrengthDescription = "1000 ML", StrengthId = 1 });

            Genders = new List<Gender>();
            Genders.Add(new Gender { GenderCode = "MLE", GenderDescription = "Male", GenderId = 1 });
            Genders.Add(new Gender { GenderCode = "FML", GenderDescription = "Female", GenderId = 2 });


            Other = new List<Other>();
            Other.Add(new Other { OtherCode = "TS1", OtherDescription = "Test 1", OtherId = 1 });

            UnitOfMeasureCategories = new List<UnitOfMeasureCategory>();

            UnitOfMeasureCategories.Add(new UnitOfMeasureCategory { UOMCategoryId = 1, UOMDescription = "Inches", UOMCode = "in", UOMType = "L" });
            UnitOfMeasureCategories.Add(new UnitOfMeasureCategory { UOMCategoryId = 2, UOMDescription = "Feet", UOMCode = "ft", UOMType = "L" });
            UnitOfMeasureCategories.Add(new UnitOfMeasureCategory { UOMCategoryId = 3, UOMDescription = "Yard", UOMCode = "yd", UOMType = "L" });
            UnitOfMeasureCategories.Add(new UnitOfMeasureCategory { UOMCategoryId = 4, UOMDescription = "Pounds", UOMCode = "lb", UOMType = "W" });
            UnitOfMeasureCategories.Add(new UnitOfMeasureCategory { UOMCategoryId = 5, UOMDescription = "Ounces", UOMCode = "oz", UOMType = "W" });

            UOMBases = new List<UOMBase>();
            UOMBases.Add(new UOMBase { UOMBaseId = 1, UOMBase1 = "Each", UOMBaseCode = "EA" });
            UOMBases.Add(new UOMBase { UOMBaseId = 2, UOMBase1 = "Case", UOMBaseCode = "CS" });
            UOMBases.Add(new UOMBase { UOMBaseId = 3, UOMBase1 = "Box", UOMBaseCode = "BX" });

        }

        public void SaveChanges()
        {

            //mock function to save changes to data base
        }


    }
}