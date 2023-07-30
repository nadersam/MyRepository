Imports System.Net
Imports System.Net.Mail
Imports System.Web.Http
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq


Public Class BlafxController
    Inherits ApiController

    'Public Shared Ark4Done As Boolean
    'Public Shared Ark3Done As Boolean
    'Public Shared Ark2Done As Boolean
    Public Shared LastArk4Trade As String = ""
    Public Shared LastArk3Trade As String = ""
    Public Shared LastArk2Trade As String = ""
    Private Function CreateWebRequest(ByVal url As String) As Net.HttpWebRequest
        Try
            Dim webRequest As Net.HttpWebRequest = CType(webRequest.Create(url), Net.HttpWebRequest)
            webRequest.ContentType = "text/xml;charset=""utf-8"""
            webRequest.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
            webRequest.Method = "GET"
            Return webRequest
            Exit Function
        Catch ex As Exception

        End Try
    End Function
    Private Function BlafxServiceCall(url As String) As String
        Try
            Dim request As Net.HttpWebRequest = CreateWebRequest(url)
            'request.Credentials = New Net.NetworkCredential("health18", "health18")
            Dim asyncResult As IAsyncResult = request.BeginGetResponse(Nothing, Nothing)
            asyncResult.AsyncWaitHandle.WaitOne()
            Dim soapResult As String
            Using webResponse As Net.WebResponse = request.EndGetResponse(asyncResult)
                Using rd As IO.StreamReader = New IO.StreamReader(webResponse.GetResponseStream())
                    soapResult = rd.ReadToEnd()
                End Using
            End Using
            Return soapResult
            Exit Function
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
    <Web.Http.HttpGet>
    Public Function TradeCheck() As String
        Dim resp As String = ""
        Dim opentime As String
        Dim OpenDate As Date
        Dim ReturnMessage As String = ""
        Try
            resp = BlafxServiceCall("https://crm.blafx.com/crm/followConsumer/getOrder?mt5Login=1001015&orderType=1")
            Dim jArray2 As JObject = JsonConvert.DeserializeObject(Of JObject)(resp)
            If jArray2.Count > 1 Then
                opentime = jArray2("rows")(0)("openTime").ToString()
            End If
            OpenDate = UnixToDateTime(opentime)
            If (OpenDate.Day = Now.Day And OpenDate.Month = Now.Month) And LastArk2Trade <> opentime Then
                Sendmail("2")
                ReturnMessage = "Ark 2 Traded Today"
                LastArk2Trade = opentime
            Else
                ReturnMessage = "Ark 2 Not Traded Today"
            End If

            resp = BlafxServiceCall("https://crm.blafx.com/crm/followConsumer/getOrder?mt5Login=5506597&orderType=1")
            Dim jArray As JObject = JsonConvert.DeserializeObject(Of JObject)(resp)
            If jArray.Count > 1 Then
                opentime = jArray("rows")(0)("openTime").ToString()
            End If
            OpenDate = UnixToDateTime(opentime)
            If (OpenDate.Day = Now.Day And OpenDate.Month = Now.Month) And LastArk4Trade <> opentime Then
                LastArk4Trade = opentime
                Sendmail("4")
                ReturnMessage = "Ark 4 Traded Today"
            Else
                ReturnMessage = "Ark 4 Not Traded Today"
            End If

            resp = BlafxServiceCall("https://crm.blafx.com/crm/followConsumer/getOrder?mt5Login=5501835&orderType=1")
            Dim jArray1 As JObject = JsonConvert.DeserializeObject(Of JObject)(resp)
            If jArray1.Count > 1 Then
                opentime = jArray1("rows")(0)("openTime").ToString()
            End If
            OpenDate = UnixToDateTime(opentime)
            If (OpenDate.Day = Now.Day And OpenDate.Month = Now.Month) And LastArk3Trade <> opentime Then
                LastArk3Trade = opentime
                Sendmail("3")
                ReturnMessage = "Ark 3 Traded Today"
            Else
                ReturnMessage = "Ark 3 Not Traded Today"
            End If


            TradeCheck = ReturnMessage
            Exit Function
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
    Private Function UnixToDateTime(ByVal strUnixTime As String) As DateTime

        Dim nTimestamp As Double = strUnixTime
        Dim nDateTime As System.DateTime = New System.DateTime(1970, 1, 1, 0, 0, 0, 0)
        nDateTime = nDateTime.AddSeconds(nTimestamp)
        Return nDateTime

    End Function
    Private Sub Sendmail(ArkType As String)
        Dim mail As New MailMessage()

        'set the addresses
        mail.From = New MailAddress("nadersam@gmail.com")
        mail.[To].Add("nadersam@gmail.com")
        mail.[To].Add("Islam1076@gmail.com")

        'set the content
        mail.Subject = "ARK " & ArkType & " Trade"
        mail.Body = "Ark " & ArkType & " traded today"

        'set the server
        Dim smtp As New SmtpClient("smtp.gmail.com")
        smtp.UseDefaultCredentials = False
        smtp.Credentials = New Net.NetworkCredential("nadersam@gmail.com", "krqsmjrjvwphildh")
        smtp.Port = 587
        smtp.EnableSsl = True

        'send the message
        Try
            smtp.Send(mail)

        Catch exc As Exception

        End Try
    End Sub
End Class
