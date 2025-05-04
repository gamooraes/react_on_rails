# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Where the requests come from( De onde vem as requisições), eg
    # Aqui limitamso as requisições para que sejam recebidas apenas pelo localhost na porta 5173, poderia ter usado origins '*' para liberar todo o tipo de requisição, mas não é uma boa prática pois geraria um autofluxo
    origins "http://localhost:5173", "http://127.0.0.1:5173"

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
