using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;

namespace ProductManagementApplication.Models
{
   
    public class CustomAuthorization : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!WebSecurity.IsAuthenticated)

            {


                filterContext.Result = new RedirectResult("~/Account/Login");

            }

            else
            {
                // If they are authorized, handle accordingly
                if (this.AuthorizeCore(filterContext.HttpContext))
                {
                    base.OnAuthorization(filterContext);
                }
                else
                {
                    // Otherwise redirect to your specific authorized area
                    filterContext.Result = new RedirectResult("~/Account/Unauthorized");
                }
            }
        }
    }
}