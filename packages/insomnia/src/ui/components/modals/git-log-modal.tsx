import React, { FC, useEffect, useRef } from 'react';
import { OverlayContainer } from 'react-aria';

import type { GitLogEntry } from '../../../sync/git/git-vcs';
import { type ModalHandle, Modal, ModalProps } from '../base/modal';
import { ModalBody } from '../base/modal-body';
import { ModalFooter } from '../base/modal-footer';
import { ModalHeader } from '../base/modal-header';
import { TimeFromNow } from '../time-from-now';
import { Tooltip } from '../tooltip';

type Props = ModalProps & {
  logs: GitLogEntry[];
  branch: string;
};

export const GitLogModal: FC<Props> = ({ branch, logs, onHide }) => {
  const modalRef = useRef<ModalHandle>(null);

  useEffect(() => {
    modalRef.current?.show();
  }, []);

  return (
    <OverlayContainer>
      <Modal ref={modalRef} onHide={onHide}>
        <ModalHeader>Git History ({logs.length})</ModalHeader>
        <ModalBody className="pad">
          <table className="table--fancy table--striped">
            <thead>
              <tr>
                <th className="text-left">Message</th>
                <th className="text-left">When</th>
                <th className="text-left">Author</th>
              </tr>
            </thead>
            <tbody>{logs.map(entry => {
              const {
                commit: { author, message },
                oid,
              } = entry;
              return (
                <tr key={oid}>
                  <td>{message}</td>
                  <td>
                    <TimeFromNow
                      className="no-wrap"
                      timestamp={author.timestamp * 1000}
                      intervalSeconds={30}
                    />
                  </td>
                  <td>
                    <Tooltip message={`${author.name} <${author.email}>`} delay={800}>
                      {author.name}
                    </Tooltip>
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <div className="margin-left italic txt-sm">
            <i className="fa fa-code-fork" /> {branch}
          </div>
          <div>
            <button className="btn" onClick={() => modalRef.current?.hide()}>
              Done
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </OverlayContainer>
  );
};
GitLogModal.displayName = 'GitLogModal';
