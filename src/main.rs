use actix_files::Files;
use actix_web::{App, HttpResponse, HttpServer, http::header, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server running at http://localhost:8080");
    HttpServer::new(|| {
        App::new().route("/cv.pdf", web::get().to(cv_pdf)).service(
            Files::new("/", "static")
                .index_file("index.html")
                .prefer_utf8(true),
        )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn cv_pdf() -> HttpResponse {
    match std::fs::read("static/cv.pdf") {
        Ok(pdf) => HttpResponse::Ok()
            .insert_header((header::CONTENT_TYPE, "application/pdf"))
            .insert_header((header::CONTENT_DISPOSITION, "inline; filename=\"cv.pdf\""))
            .body(pdf),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}
