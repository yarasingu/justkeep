var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles(); // Enable serving static files from wwwroot

app.MapGet("/", (HttpContext context) =>
{
    context.Response.Redirect("/calculator/index.html"); // Redirect to the "index.html" page
    return Task.CompletedTask;
});

app.Run();

