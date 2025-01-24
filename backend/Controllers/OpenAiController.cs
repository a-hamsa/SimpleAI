using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAiController : ControllerBase
    {
        private const string TenantId = "YOUR_TENANT_ID"; // Replace with your Tenant ID
        private const string ClientId = "YOUR_CLIENT_ID"; // Replace with your Client ID
        private const string ClientSecret = "YOUR_CLIENT_SECRET"; // Replace with your Client Secret
        private const string ApiKey = "YOUR_API_KEY"; // Replace with your API Key
        private const string Endpoint = "https://ahmad-m6awwa94-swedencentral.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

        [HttpPost("entra-id-auth")]
        public async Task<IActionResult> EntraIdAuth([FromForm] IFormFile image, [FromForm] string question)
        {
            try
            {
                // Convert image to Base64
                string encodedImage = ConvertImageToBase64(image);

                // Acquire token using Entra ID
                var token = await AcquireToken();

                // Call OpenAI API
                var result = await CallOpenAiApi(encodedImage, question, token, isApiKey: false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("key-auth")]
        public async Task<IActionResult> KeyAuth([FromForm] IFormFile image, [FromForm] string question)
        {
            try
            {
                // Convert image to Base64
                string encodedImage = ConvertImageToBase64(image);

                // Call OpenAI API with API Key
                var result = await CallOpenAiApi(encodedImage, question, ApiKey, isApiKey: true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        private static string ConvertImageToBase64(IFormFile image)
        {
            using (var ms = new MemoryStream())
            {
                image.CopyTo(ms);
                return Convert.ToBase64String(ms.ToArray());
            }
        }

        private static async Task<string> AcquireToken()
        {
            IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(ClientId)
                .WithClientSecret(ClientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{TenantId}"))
                .Build();

            string[] scopes = new string[] { "https://management.azure.com/.default" };
            AuthenticationResult result = await app.AcquireTokenForClient(scopes).ExecuteAsync();
            return result.AccessToken;
        }

        private static async Task<string> CallOpenAiApi(string encodedImage, string question, string authValue, bool isApiKey)
        {
            using (var httpClient = new HttpClient())
            {
                if (isApiKey)
                {
                    httpClient.DefaultRequestHeaders.Add("api-key", authValue);
                }
                else
                {
                    httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {authValue}");
                }

                var payload = new
                {
                    messages = new object[]
                    {
                        new
                        {
                            role = "system",
                            content = new[]
                            {
                                new { type = "text", text = "You are an AI assistant that helps people find information." }
                            }
                        },
                        new
                        {
                            role = "user",
                            content = new[]
                            {
                                new { type = "image_url", image_url = new { url = $"data:image/jpeg;base64,{encodedImage}" } },
                                new { type = "text", text = question }
                            }
                        }
                    },
                    temperature = 0.7,
                    top_p = 0.95,
                    max_tokens = 800,
                    stream = false
                };

                var response = await httpClient.PostAsync(Endpoint, new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new Exception($"Error: {response.StatusCode}, {response.ReasonPhrase}");
                }
            }
        }
    }
}
