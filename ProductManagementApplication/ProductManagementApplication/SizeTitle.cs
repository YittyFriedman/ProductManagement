//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class SizeTitle
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SizeTitle()
        {
            this.Sizes = new HashSet<Size>();
        }
    
        public int SizeTitleId { get; set; }
        public string SizeTitleDescription { get; set; }
        public Nullable<bool> IsVoided { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Size> Sizes { get; set; }
    }
}
