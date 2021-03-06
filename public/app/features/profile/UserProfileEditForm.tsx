import React, { FC } from 'react';
import { Button, Tooltip, Icon, Form, Input, Field, FieldSet } from '@grafana/ui';
import { UserDTO } from 'app/types';
import config from 'app/core/config';
import { ProfileUpdateFields } from 'app/core/utils/UserProvider';

export interface Props {
  user: UserDTO;
  isSavingUser: boolean;
  updateProfile: (payload: ProfileUpdateFields) => void;
}

const { disableLoginForm } = config;

export const UserProfileEditForm: FC<Props> = ({ user, isSavingUser, updateProfile }) => {
  const onSubmitProfileUpdate = (data: ProfileUpdateFields) => {
    updateProfile(data);
  };

  return (
    <Form onSubmit={onSubmitProfileUpdate} validateOn="onBlur">
      {({ register, errors }) => {
        return (
          <FieldSet label="Edit profile">
            <Field label="Name" invalid={!!errors.name} error="Name is required" disabled={disableLoginForm}>
              <Input
                {...register('name', { required: true })}
                placeholder="Name"
                defaultValue={user.name}
                suffix={<InputSuffix />}
              />
            </Field>
            <Field label="Email" invalid={!!errors.email} error="Email is required" disabled={disableLoginForm}>
              <Input
                {...register('email', { required: true })}
                placeholder="Email"
                defaultValue={user.email}
                suffix={<InputSuffix />}
              />
            </Field>
            <Field label="Username" disabled={disableLoginForm}>
              <Input {...register('login')} defaultValue={user.login} placeholder="Username" suffix={<InputSuffix />} />
            </Field>
            <div className="gf-form-button-row">
              <Button variant="primary" disabled={isSavingUser}>
                Save
              </Button>
            </div>
          </FieldSet>
        );
      }}
    </Form>
  );
};

export default UserProfileEditForm;

const InputSuffix: FC = () => {
  return disableLoginForm ? (
    <Tooltip content="Login details locked because they are managed in another system.">
      <Icon name="lock" />
    </Tooltip>
  ) : null;
};
