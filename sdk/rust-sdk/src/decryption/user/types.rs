use crate::blockchain::bindings::{Decryption::CtHandleContractPair, IDecryption::RequestValidity};
use alloy::primitives::{Address, Bytes};
use kms_grpc::kms::v1::TypedPlaintext;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserDecryptRequest {
    ct_handle_contract_pairs: Vec<CtHandleContractPair>,
    request_validity: RequestValidity,
    contracts_chain_id: u64,
    contract_addresses: Vec<Address>,
    user_address: Address,
    signature: Bytes,
    public_key: Bytes,
}

#[derive(Debug, Clone)]
pub struct UserDecryptionResult {
    plaintexts: Vec<TypedPlaintext>,
    metadata: DecryptionMetadata,
}

#[derive(Debug, Clone)]
pub struct DecryptionMetadata {
    handle_count: usize,
    user_address: Address,
    signatures_verified: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DecryptedValue {
    handle: String,
    value: Vec<u8>,
    fhe_type: i32,
}

#[derive(Default)]
pub(super) struct ResponseConfig {
    kms_signers: Option<Vec<String>>,
    user_address: Option<String>,
    gateway_chain_id: Option<u64>,
    verifying_contract_address: Option<String>,
    signature: Option<String>,
    public_key: Option<String>,
    private_key: Option<String>,
    handle_contract_pairs: Option<Vec<CtHandleContractPair>>,
    json_response: Option<String>,
    verify_signatures: bool,
}
