using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductManagementApplication.Models.DTO
{
    public class MockDBTables
    {
       
        public List<icitem> icitems = new List<icitem>();
        public List<iciwh> iciwhs = new List<iciwh>();
        public List<ictype> ictypes = new List<ictype>();
        public List<Supplier> Suppliers = new List<Supplier>();
        public List<Brand> Brands = new List<Brand>();
        public List<Color> Colors = new List<Color>();
        public List<Type> Types = new List<Type>();
        public List<Orientation> Orientations = new List<Orientation>();
        public List<Size> Sizes = new List<Size>();
        public List<SizeTitle> SizeTitles = new List<SizeTitle>();
        public List<Product> Products = new List<Product>();
        public List<Gender> Genders = new List<Gender>();
        public List<Other> Other = new List<Other>();
        public List<Vendor> Vendors = new List<Vendor>();
        public List<ClassHierarchy> ClassHierarchies = new List<ClassHierarchy>();
        public List<Flavor> Flavors = new List<Flavor>();
        public List<Packaging> Packagings = new List<Packaging>();
        public List<UnitOfMeasure> UnitOfMeasures = new List<UnitOfMeasure>();
        public List<UnitOfMeasureCategory> UnitOfMeasureCategories = new List<UnitOfMeasureCategory>();
        public List<Strength> Strengths = new List<Strength>();
        public List<UOMBase> UOMBases = new List<UOMBase>();
        public List<ProductMapping> ProductMappings = new List<ProductMapping>();
     
        public void InitializeTables()
        {
         

          

          

            Gender gender = new Gender();
            gender.GenderCode= "MLE";
            gender.GenderDescription = "Male";
            gender.GenderId = 1;
            Genders.Add(gender);


        }
        public void SaveChanges()
        {
            
            //mock function to save changes to data base
        }

         
    }
}