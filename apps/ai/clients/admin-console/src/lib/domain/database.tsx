import { ETableSyncStatus, TableSyncStatus } from '@/models/api'
import { ColorClasses, ResourceColors } from '@/models/domain'
import {
  Check,
  CircleSlash,
  LucideIcon,
  RefreshCcw,
  ShieldAlert,
  XCircle,
} from 'lucide-react'

export const DOMAIN_TABLE_SYNC_STATUS_COLORS: ResourceColors<TableSyncStatus> =
  {
    [ETableSyncStatus.NOT_SYNCHRONIZED]: {
      text: 'text-gray-500',
    },
    [ETableSyncStatus.SYNCHRONIZING]: {
      text: 'text-yellow-600',
    },
    [ETableSyncStatus.SYNCHRONIZED]: {
      text: 'text-green-700',
    },
    [ETableSyncStatus.DEPRECATED]: {
      text: 'text-orange-800',
    },
    [ETableSyncStatus.FAILED]: {
      text: 'text-red-600',
    },
  }

export const formatDriver = (driver: string) => `${driver}://`

export const getDomainTableSyncStatusColors = (
  sync_status: TableSyncStatus,
): ColorClasses => {
  return DOMAIN_TABLE_SYNC_STATUS_COLORS[sync_status]
}

export const isSelectableByStatus = (sync_status: TableSyncStatus): boolean =>
  [
    ETableSyncStatus.NOT_SYNCHRONIZED,
    ETableSyncStatus.FAILED,
    ETableSyncStatus.SYNCHRONIZED,
  ].includes(ETableSyncStatus[sync_status])

export const getDomainTableSyncStatusIcon = (
  sync_status: TableSyncStatus,
): LucideIcon | null => {
  switch (sync_status) {
    case ETableSyncStatus.SYNCHRONIZED:
      return Check
    case ETableSyncStatus.SYNCHRONIZING:
      return RefreshCcw
    case ETableSyncStatus.NOT_SYNCHRONIZED:
      return CircleSlash
    case ETableSyncStatus.DEPRECATED:
      return ShieldAlert
    case ETableSyncStatus.FAILED:
      return XCircle
    default:
      return null
  }
}

export const formatTableSyncStatus = (sync_status: TableSyncStatus): string => {
  return sync_status?.replace('_', ' ').toLowerCase()
}