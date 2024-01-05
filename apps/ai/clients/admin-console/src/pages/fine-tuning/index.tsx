import { DataTable } from '@/components/data-table/data-table'
import { finetunningsColumns } from '@/components/fine-tunnings/columns'
import FineTunningsError from '@/components/fine-tunnings/error'
import PageLayout from '@/components/layout/page-layout'
import { ContentBox } from '@/components/ui/content-box'
import useFinetunings from '@/hooks/api/fine-tuning/useFinetunings'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { SlidersIcon } from 'lucide-react'
import { FC, useMemo } from 'react'

const FineTuningPage: FC = () => {
  const { isLoading, error, models } = useFinetunings()
  const columns = useMemo(() => finetunningsColumns, [])

  let pageContent = <></>

  if (isLoading) {
    pageContent = <div>Loading...</div>
  } else if (error) {
    pageContent = <FineTunningsError />
  } else if (models?.length === 0) {
    pageContent = <div className="text-slate-500">No models created yet.</div>
  } else {
    pageContent = models ? <DataTable columns={columns} data={models} /> : <></>
  }

  return (
    <PageLayout>
      <div className="gap-4 m-6">
        <ContentBox className="w-fit min-w-[35vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]">
          <div className="flex items-center gap-2">
            <SlidersIcon size={20} strokeWidth={2.5} />
            <h1 className="font-semibold">Fine-tuning models</h1>
          </div>
          <div className="grow overflow-auto">{pageContent}</div>
        </ContentBox>
      </div>
    </PageLayout>
  )
}

export default withPageAuthRequired(FineTuningPage)