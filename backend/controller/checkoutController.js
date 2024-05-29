const PhoneListings = require('../models/PhoneListing');

exports.processTransaction = async (req, res) => {
    const transactionDetails = req.body;

    try {
        for (const item of transactionDetails) {
            const listing = await PhoneListings.findById(item.ID);
            if (!listing) {
                res.status(404).send('Item not found');
                return;
            }

            if (listing.stock < item.quantity) {
                res.status(400).send('Not enough stock');
                return;
            }

            listing.stock -= item.quantity;
            await listing.save();
        }

        res.status(200).send('Transaction processed successfully');
    } catch (error) {
        console.error('Error processing transaction:', error);
        res.status(500).send('Error processing transaction');
    }
};
