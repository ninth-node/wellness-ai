'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentSchema, AppointmentFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AppointmentFormProps {
  initialData?: Partial<AppointmentFormData>;
  clients?: Array<{ id: number; first_name: string; last_name: string }>;
  treatments?: Array<{ id: number; name: string; duration_minutes: number }>;
  staff?: Array<{ id: number; full_name: string }>;
  onSubmit: (data: AppointmentFormData) => Promise<void>;
  onCancel?: () => void;
}

export function AppointmentForm({
  initialData,
  clients = [],
  treatments = [],
  staff = [],
  onSubmit,
  onCancel,
}: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: initialData,
  });

  const clientId = watch('client_id');
  const treatmentId = watch('treatment_id');
  const staffId = watch('staff_id');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client_id">Client *</Label>
          <Select
            value={clientId?.toString() || ''}
            onValueChange={(value) => setValue('client_id', parseInt(value))}
          >
            <SelectTrigger className={errors.client_id ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.first_name} {client.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.client_id && (
            <p className="text-sm text-red-500 mt-1">{errors.client_id.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="treatment_id">Treatment *</Label>
          <Select
            value={treatmentId?.toString() || ''}
            onValueChange={(value) => setValue('treatment_id', parseInt(value))}
          >
            <SelectTrigger className={errors.treatment_id ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select treatment" />
            </SelectTrigger>
            <SelectContent>
              {treatments.map((treatment) => (
                <SelectItem key={treatment.id} value={treatment.id.toString()}>
                  {treatment.name} ({treatment.duration_minutes} min)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.treatment_id && (
            <p className="text-sm text-red-500 mt-1">{errors.treatment_id.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appointment_datetime">Date & Time *</Label>
          <Input
            id="appointment_datetime"
            type="datetime-local"
            {...register('appointment_datetime')}
            className={errors.appointment_datetime ? 'border-red-500' : ''}
          />
          {errors.appointment_datetime && (
            <p className="text-sm text-red-500 mt-1">{errors.appointment_datetime.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="staff_id">Staff Member</Label>
          <Select
            value={staffId?.toString() || ''}
            onValueChange={(value) => setValue('staff_id', value ? parseInt(value) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select staff (optional)" />
            </SelectTrigger>
            <SelectContent>
              {staff.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()}>
                  {member.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="special_requests">Special Requests</Label>
        <Textarea
          id="special_requests"
          {...register('special_requests')}
          placeholder="Any special requests or notes for this appointment..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </Button>
      </div>
    </form>
  );
}
