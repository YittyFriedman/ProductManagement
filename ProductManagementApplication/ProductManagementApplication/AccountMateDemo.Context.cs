﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProductManagementApplication
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class sample999Entities : DbContext
    {
        public sample999Entities()
            : base("name=sample999Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<icunit> icunits { get; set; }
        public virtual DbSet<iciwh> iciwhs { get; set; }
        public virtual DbSet<icvend> icvends { get; set; }
        public virtual DbSet<icwhse> icwhses { get; set; }
        public virtual DbSet<icitem_map> icitem_map { get; set; }
        public virtual DbSet<ictype> ictypes { get; set; }
        public virtual DbSet<icitem> icitems { get; set; }
    }
}
