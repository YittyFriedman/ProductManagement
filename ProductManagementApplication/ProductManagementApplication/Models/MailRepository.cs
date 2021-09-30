using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using WebMatrix.WebData;

namespace ProductManagementApplication.Models
{
    public class MailRepository
    {
        private ErrorTracer error = new ErrorTracer();
        public string SendEmail(string subject, string body, List<string> toList)
        {
            string MailResult = null;
            try
            {
                String userName = "Yitty@mbsny.net";
                String password = "Accountmate@2694";
                MailMessage msg = new MailMessage();

                foreach (var recepient in toList)
                {
                    msg.To.Add(recepient);
                }

                msg.CC.Add(new MailAddress("Yitty@mbsny.net"));
                msg.From = new MailAddress(userName);
                msg.Subject = subject;
                msg.Body = body;
                msg.IsBodyHtml = true;
                SmtpClient client = new SmtpClient();
                client.Host = "smtp.office365.com";
                client.Credentials = new System.Net.NetworkCredential(userName, password);
                client.Port = 25;
                client.EnableSsl = true;
                client.Send(msg);

                MailResult = "Mail(s) sent successfully.";
                return MailResult;
            }
            catch (Exception ex)
            {
                error.LogSystemError("SendEmail", ex.Message, WebSecurity.CurrentUserName, "Approve");
              
                MailResult = "Mail Unsuccessful : " + ex.Message;
                return MailResult;
            }
         

        }
    }
}