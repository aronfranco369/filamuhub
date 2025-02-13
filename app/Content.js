// models/Content.js
export class Content {
  constructor(data) {
    this.id = data.id || null;
    this.externalId = data.external_id || "";
    this.type = data.type || "";
    this.title = data.title || "";
    this.country = data.country || "";
    this.year = data.year || "";
    this.genres = data.genres || [];
    this.posterUrl = data.poster_url || "";
    this.plotSummary = data.plot_summary || "";
    this.dj = data.dj || "";
    this.season = data.season || "";
    this.downloadUrl = data.download_url || "";
    this.fileSize = data.file_size || "";
    this.createdAt = data.created_at ? new Date(data.created_at) : null;
    this.updatedAt = data.updated_at ? new Date(data.updated_at) : null;
    this.episodes = [];
  }

  // Helper method to add episodes
  addEpisode(episode) {
    this.episodes.push(new Episode(episode));
  }

  // Helper method to get formatted creation date
  getFormattedCreatedAt() {
    return this.createdAt?.toLocaleDateString() || "N/A";
  }

  // Helper method to get formatted update date
  getFormattedUpdatedAt() {
    return this.updatedAt?.toLocaleDateString() || "N/A";
  }

  // Helper method to check if content is a series
  isSeries() {
    return this.type === "series";
  }

  // Helper method to get formatted file size
  getFormattedFileSize() {
    return this.fileSize || "N/A";
  }
}

// Episode class for series content
export class Episode {
  constructor(data) {
    this.id = data.id || null;
    this.contentId = data.content_id || null;
    this.title = data.title || "";
    this.downloadUrl = data.download_url || "";
    this.fileSize = data.file_size || "";
    this.createdAt = data.created_at ? new Date(data.created_at) : null;
    this.updatedAt = data.updated_at ? new Date(data.updated_at) : null;
  }

  // Helper method to get formatted file size
  getFormattedFileSize() {
    return this.fileSize || "N/A";
  }
}
