using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Validation;
using System.IO;

namespace ProductManagementApplication.Models
{
    public class ErrorTracer
    {
    //    private ProductManagementEntities db = new ProductManagementEntities();
        public void LogSystemError(string method, string errorMessage, string userName, string module)
        {
            SystemErrorLog errorLog = new SystemErrorLog();
            errorLog.Module = module;
            errorLog.Method = method;
            errorLog.ErrorMessage = errorMessage;
            errorLog.SystemUser = userName;
            errorLog.LogDateTime = DateTime.Now;

            //ADD ERROR TO ERROR TABLE
          //  db.SystemErrorLogs.Add(errorLog);
            //db.SaveChanges();
        }
        public static void Error(string message, string method)
        {
            WriteEntry(message, "error", method);
        }

        public static void Error(string message, string method, string user)
        {
            WriteEntry(message, "error", method, user);
        }

        public static void Error(Exception ex, string method)
        {
            if (ex.InnerException != null)
            {
                WriteEntry("Inner Exception:" + ex.InnerException.Message, "error", method);
                if (ex.InnerException.InnerException != null)
                {
                    WriteEntry("Inner Exception:" + ex.InnerException.InnerException.Message, "error", method);
                }
            }
            WriteEntry(ex.Message, "error", method);
        }

        public static void Error(Exception ex, string method, string user)
        {
            if (ex.InnerException != null)
            {
                WriteEntry("Inner Exception:" + ex.InnerException.Message, "error", method, user);
                if (ex.InnerException.InnerException != null)
                {
                    WriteEntry("Inner Exception:" + ex.InnerException.InnerException.Message, "error", method, user);
                }
            }
            WriteEntry(ex.Message, "error", method, user);
        }

        public static void Error(NullReferenceException ex, string method)
        {
            if (ex.InnerException != null)
            {
                WriteEntry("Inner Exception:" + ex.InnerException.Message, "error", method);
                if (ex.InnerException.InnerException != null)
                {
                    WriteEntry("Inner Exception:" + ex.InnerException.InnerException.Message, "error", method);
                }
            }
            WriteEntry(ex.Message, "error", method);
        }

        public static void Error(NullReferenceException ex, string method, string user)
        {
            if (ex.InnerException != null)
            {
                WriteEntry("Inner Exception:" + ex.InnerException.Message, "error", method, user);
                if (ex.InnerException.InnerException != null)
                {
                    WriteEntry("Inner Exception:" + ex.InnerException.InnerException.Message, "error", method, user);
                }
            }
            WriteEntry(ex.Message, "error", method, user);
        }

        public static void Error(DbEntityValidationException dbEx, string method)
        {
            if (dbEx.InnerException != null)
            {
                WriteEntry("Inner Exception:" + dbEx.InnerException.Message, "db error", method);
                if (dbEx.InnerException.InnerException != null)
                {
                    WriteEntry("Inner Exception:" + dbEx.InnerException.InnerException.Message, "db error", method);
                }
            }

            foreach (var validationErrors in dbEx.EntityValidationErrors)
            {
                foreach (var validationError in validationErrors.ValidationErrors)
                {
                    WriteEntry(String.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage), "db error", method);
                }
            }
        }

        public static void Error(DbEntityValidationException dbEx, string method, string user)
        {
            if (dbEx.InnerException != null)
            {
                WriteEntry("Inner Exception:" + dbEx.InnerException.Message, "db error", method);
                if (dbEx.InnerException.InnerException != null)
                {
                    WriteEntry("Inner Exception:" + dbEx.InnerException.InnerException.Message, "db error", method);
                }
            }

            foreach (var validationErrors in dbEx.EntityValidationErrors)
            {
                foreach (var validationError in validationErrors.ValidationErrors)
                {
                    WriteEntry(String.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage), "db error", method, user);
                }
            }
        }

        public static void Warning(string message, string method)
        {
            WriteEntry(message, "warning", method);
        }

        public static void Info(string message, string method)
        {
            WriteEntry(message, "info", method);
        }

        public static void WriteEntry(string message, string type, string method)
        {
            var currentDir = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            string logFile = currentDir + "\\ErrorLog.txt";

            StreamWriter sw = new StreamWriter(logFile, true);
            sw.WriteLine(string.Format("{0} {1} {2} : {3}",
                                  DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                                  method,
                                  type,
                                  message));
            sw.Close();

        }

        private static void WriteEntry(string message, string type, string method, string user)
        {
            var currentDir = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            string logFile = currentDir + "\\ErrorLog.txt";
            StreamWriter sw = new StreamWriter(logFile, true);
            sw.WriteLine(string.Format("{0} {1} {2} [{3}]: {4}",
                                  DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                                  method,
                                  type,
                                  user,
                                  message));
            sw.Close();

        }


    

    }
}
