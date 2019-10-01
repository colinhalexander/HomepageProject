class FoldersController < ApplicationController
  def index
    @folders = Folder.all

    render json: @folders, include: :links
  end

  def create
    @folder = Folder.create({
        name: params[:name]
    })
    
    render json: @folder
  end

  def destroy
    Folder.destroy(params[:id])
  end
end
