using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Configuration;
using CourseProject2018.Repositories;
using CourseProject2018.Models;
using Stripe;

namespace CourseProject2018
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })

            .AddCookie(options =>
            {
                options.LoginPath = "/";
                options.LogoutPath = "/signout";
            })

            .AddGoogle(options =>
            {
                //Below creadentials should be pulled from  RimZim8000 account https://console.developers.google.com/apis/credentials?project=courseproject-2017-2018&authuser=2
                options.ClientId = "8084058359-9dt17ijv9lgcldm6eqkvgem7f70pu0oa.apps.googleusercontent.com";
                options.ClientSecret = "";
            });

            //services.AddSingleton<IdocdbRepository<Item>, DocdbRepository<Item>>();
            services.AddSingleton<IdocdbRepository<Product>, DocdbRepository<Product>>();
            services.AddSingleton<IdocdbRepository<Order>, DocdbRepository<Order>>();
            services.AddSingleton<IdocdbRepository<UserInfo>, DocdbRepository<UserInfo>>();
            services.AddSingleton<IdocdbRepository<Contact>, DocdbRepository<Contact>>();
            services.AddMvc().AddXmlSerializerFormatters();

            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            StripeConfiguration.SetApiKey("");
            app.UseStaticFiles();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
