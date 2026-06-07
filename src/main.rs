use actix_files::Files;
use actix_web::{App, HttpResponse, HttpServer, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server running at http://localhost:8080");
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .service(Files::new("/assets", "static").prefer_utf8(true))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn index() -> HttpResponse {
    let html = std::fs::read_to_string("static/index.html").unwrap();
    HttpResponse::Ok().content_type("text/html").body(html)
}
