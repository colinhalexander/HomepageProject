class LinksController < ApplicationController
  def index
      @links = Link.all

      render json: @links
  end

  def show
      @link = Link.find(params[:title])

      render json: @link
  end

  def create
      @link = Link.create({
          title: params[:title],
          url: params[:url],
          icon: params[:icon]
      })
      
      render json: @link
  end
end
