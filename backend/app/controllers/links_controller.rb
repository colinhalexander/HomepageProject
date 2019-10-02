class LinksController < ApplicationController
  def index
    @links = Link.all

    render json: @links
  end

  def create
    @link = Link.create({
        title: params[:title],
        url: params[:url],
        icon: params[:icon],
        folder_id: params[:folder_id]
    })
    
    render json: @link
  end

  def update
    @link = Link.find(params[:id])
    @link.update(folder_id: params[:folder_id])

    render json: @link
  end

  def destroy
    Link.destroy(params[:id])
  end
end
