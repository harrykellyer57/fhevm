mod raw;
pub use parsed::Config as Config;
mod parsed;

Or, even shorter (assuming the only purpose is to re-export `parsed::Config` and include both modules):

mod raw;
mod parsed;
pub use parsed::Config;
