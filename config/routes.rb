Rails.application.routes.draw do
  Rails.application.routes.draw do
    get '*path', to: 'beer#index', constraints: ->(request) do
      !request.xhr? && request.format.html?
    end
  end
end
