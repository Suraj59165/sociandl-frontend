export enum PaymentMethodType {
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  WALLET = 'WALLET',
  CASH = 'CASH',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  DELETED = "DELETED",
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  INACTIVE = "INACTIVE"
}

export enum MasterType {
  EXCHANGE_RATE = 'EXCHANGE_RATE',
  PLATFORM_FEES = 'PLATFORM_FEES'
}

export enum AdType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum AdPriceType {
  FIXED = 'FIXED',
  FLOATING = 'FLOATING',
}

export enum AdStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  TERMINATED = 'TERMINATED',
}


export enum AdOrderStatus {
  INCOMING = 'INCOMING',
  ONGOING = 'ONGOING',
  FULFILLED = 'FULFILLED',
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  TRANSFERRED = 'TRANSFERRED',
  CANCELLED = 'CANCELLED',
  APPEALED = 'APPEALED',
  RELEASED = 'RELEASED',
  CASH = 'CASH',
  IN_PROGRESS = 'IN_PROGRESS'
}

export enum AppealedStatus {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_ACCEPTED = 'NOT_ACCEPTED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  RESOLVED = 'RESOLVED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
  COMPLETED = 'COMPLETED'
}

export enum TransactionType {
  CREDITED = 'CREDITED',
  TRANSFERRED = 'TRANSFERRED',
  DEDUCTED = 'DEDUCTED',
  EXCHANGED = 'EXCHANGED',
  SELL_ORDER = 'ELL_ORDER',
  BUY_ORDER = 'BUY_ORDER'
}

export enum DateTimeOptionType {
  DATE_ISO = 'date-iso',
  DATE_DMY = 'date-dmy',
  DATE_MDY = 'date-mdy',
  DATE_TIME_FULL = 'date-time-full',
  TIME_EXACT = 'time-exact',
  TIME_HMS = 'time-hms',
  TIME_MS = 'time-ms',
  TOTAL_SECONDS = 'total-seconds',
  DATE_TIME_12HR = 'DATE_TIME_12HR',
  DATE_MY = 'DATE_MY'
}

export enum AppealType {
  REFUND = 'REFUND',
  DISPUTE = 'DISPUTE',
  SCAM = 'SCAM',
  AD_ORDER = 'AD_ORDER',
  DELIVERY_ISSUE = 'DELIVERY_ISSUE',
  PAYMENT_ISSUE = 'PAYMENT_ISSUE',
  SERVICE_QUALITY = 'SERVICE_QUALITY',
  OTHERS = 'OTHERS'
}

export enum PriorityLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum ChatModule {
  AD_ORDER = 'AD_ORDER',
}

export enum AppName {
  PAA_CRYPTO = 'PAA_CRYPTO',
}


