const Listing = require('../models/listing');

async function getAllListings() {
  try {
    const listings = await Listing.find();

    return {
      success: true,
      data: listings
    };
  } catch (err) {
    return {
      success: false,
      message: 'Listings not found!'
    };
  }
}

async function getListingById(id) {
  let listing;
  try {
    listing = await Listing.findById(id);
    if (listing == null) {
      return {
        success: false,
        message: 'Could not find listing for id ' + id
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }

  return {
    success: true,
    data: listing
  };
}

async function addListing(body) {
  const listing = new Listing(body);

  try {
    const newListing = await listing.save();
    return {
      success: true,
      data: newListing
    };
  } catch (err) {
    return {
      success: false,
      message: 'Failed to save new listing.'
    };
  }
}

async function updateListing(id, title=null, description=null, price=null) {
  let listing;

  try {
    listing = await Listing.findById(id);
    if (listing == null) {
      return {
        success: false,
        message: 'Could not find listing for id ' + id
      };
    }

    if (title != null) {
      listing.title = title;
    }
    if (description != null) {
      listing.description = description;
    }
    if (price != null) {
      listing.price = price;
    }

    try {
      const updatedListing = await listing.save();

      return {
        success: true,
        data: updatedListing,
        message: 'Listing updated successfully for id ' + id
      };
    } catch (err) {
      return {
        success: false,
        message: 'Failed to update listing for id ' + id
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
}

async function removeListing(id) {
  let listing;

  try {
    listing = await Listing.findById(id);
    if (listing == null) {
      return {
        success: false,
        message: 'Could not find listing for id ' + id
      };
    }

    try {
      await listing.remove();
      return {
        success: true,
        message: 'Deleted listing for id ' + id
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
}

module.exports = {
  getAllListings,
  getListingById,
  addListing,
  updateListing,
  removeListing
};