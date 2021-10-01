using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;
using ProductManagementApplication.Models;
using ProductManagementApplication.Models.DTO;

namespace ProductManagementApplication.Controllers
{
    public class AccountController : Controller
    {
        //

        // GET: /Account/

        //   private database1 dbs = new database1();

        public ActionResult Index()

        {

            return View();

        }

        public ActionResult Unauthorized()

        {

            return View();

        }

        private MailRepository mail = new MailRepository();
        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        [HttpGet]

        public ActionResult Login()

        {

            //if (!WebSecurity.Initialized)

            //{

            //    // WebSecurity.InitializeDatabaseConnection("MembershipDbContext", "Users", "UserId", "UserName", autoCreateTables: true);


            //    return View();

            //}

            return View();

        }



        [HttpPost]

        public ActionResult Login(FormCollection Form)

        {
            try
            {

                var userName = Form["UserName"];
                var password = Form["Password"];
                if (!String.IsNullOrEmpty(userName) || !String.IsNullOrEmpty(password))
                {


                    //**
                    // bool Authenticated = WebSecurity.Login(userName, password, false);

                    bool Authenticated = true;

                    if (Authenticated)
                    {

                        string Return_Url = Request.QueryString["ReturnUrl"];

                        if (Return_Url == null)
                        {

                            Response.Redirect("/Home/Index");

                        }

                        else
                        {

                            Response.Redirect(Return_Url);

                        }
                    }
                }
                else
                {
                    ViewBag.Message = "Username or Password is incorrect.";
                }
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
            }

            return View();
        }


        //  [CustomAuthorization(Roles = "Register")]
        [HttpGet]
        public ActionResult Register()

        {
            // var user =  Environment.UserName;

            //if (!WebSecurity.Initialized)

            //{

            //    WebSecurity.InitializeDatabaseConnection("MembershipDbContext", "Users", "UserId", "UserName", autoCreateTables: true);

            //}

            return View();

        }



        [HttpPost]

        public ActionResult Register(FormCollection Form)

        {
            try
            {
              
              //  var registeredUsers = (from r in dbs.RegisteredUsers where r.IsVoided != true select r.UserName).ToList();

                var email = Form["UserName"];//this is email address
                //if (registeredUsers.Contains(email))
                //{



                    var completeName = Form["FirstName"] + " " + Form["LastName"];

                    //WebSecurity.CreateUserAndAccount(Form["UserName"], Form["Password"], new
                    //{
                    //    UserName = email,
                    //    CompleteName = completeName
                    //,
                    //    FirstName = Form["FirstName"],
                    //    LastName = Form["LastName"],
                    //    Email = email
                    //});

                    Response.Redirect("~/Account/Login");
              //  }
                //else
                //{
                //    ViewBag.Message = "Unauthorized to create an account. Please contact system admin.";
                //}
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
            }
            return View();

        }



        public ActionResult Logout()

        {

          //  WebSecurity.Logout();

            Response.Redirect("~/Account/Login");

            return View();

        }
        public ActionResult ResetPassword()

        {

            return View();

        }
        public ActionResult ResetPwStepTwo()

        {

            return View();

        }
        public ActionResult InvalidUserName()

        {

            return View();

        }
        public ActionResult ResetPasswordError()

        {

            return View();

        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult ResetPassword(FormCollection Form)
        {
            try
            {
                string emailAddress = Form["UserName"];
                if (!string.IsNullOrEmpty(emailAddress))
                {
                    //string confirmationToken =
                    //    WebSecurity.GeneratePasswordResetToken(emailAddress);


                    //ResetPasswordConfirmModel rpcm = new ResetPasswordConfirmModel();
                    //rpcm.Token = confirmationToken;
                    //return RedirectToAction("ResetPasswordConfirmation", "Account", rpcm);
                    return RedirectToAction("InvalidUserName");

                }

                return RedirectToAction("InvalidUserName");
            }
            catch (Exception ex)
            {
                return RedirectToAction("InvalidUserName");

            }
        }

        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation(string Id)
        {
            try
            {
                ResetPasswordConfirmModel model = new ResetPasswordConfirmModel() { Token = Id };
                return View(model);
            }
            catch (Exception ex)
            {
                ViewBag.Message = "An error occurred while resetting your password." + ex.Message;
                return RedirectToAction("ResetPasswordError");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult ResetPasswordConfirmation(ResetPasswordConfirmModel model)
        {
            try
            {
                //if (WebSecurity.ResetPassword(model.Token, model.NewPassword))
                //{
                //    ViewBag.Message = "Your password has been successfully reset.";
                //    return RedirectToAction("Login");
                //}
                return RedirectToAction("ResetPasswordError");
            }
            catch (Exception ex)
            {
                ViewBag.Message = "An error occurred while resetting your password." + ex.Message;
                return RedirectToAction("ResetPasswordError");
            }
        }


    }

}